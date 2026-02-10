import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AdminUser } from 'src/authentication/entities/admin-user.entity';
import { Model } from 'mongoose';
import { AdminPassword } from 'src/authentication/entities/admin-password.entity';
import { genSalt, hash } from 'bcrypt';
import { PaginationQuery } from 'src/common/interfaces/pagination-query.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('AdminUser') private adminUserModel: Model<AdminUser>,
    @InjectModel('AdminPassword')
    private adminPasswordModel: Model<AdminPassword>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt: string = await genSalt();
    const initPassword = createUserDto.name + createUserDto.surname;
    console.log('Initial Password: ', initPassword);
    const passwordHash = await hash(initPassword.toLowerCase(), salt);

    const createdUser = new this.adminUserModel({
      ...createUserDto,
    });

    const createdUserPassword = new this.adminPasswordModel({
      user: createdUser._id,
      password: passwordHash,
      salt,
    });

    await createdUser.save();
    await createdUserPassword.save();

    return {
      success: true,
      result: createdUser,
      message: 'User created successfully',
    };
  }

  async findAll(query: PaginationQuery) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created',
      filter,
      equal,
      sortValue = 'desc',
    } = query;
    const skip = page * limit - limit;
    const fieldsArr = query.fields ? query.fields.split(',') : [];

    const fields: { $or?: Array<{ [key: string]: { $regex: RegExp } }> } =
      fieldsArr.length === 0 ? {} : { $or: [] };

    if (query.q && fields.$or) {
      for (const field of fieldsArr) {
        fields.$or.push({ [field]: { $regex: new RegExp(query.q, 'i') } });
      }
    }

    const resultPromise = this.adminUserModel
      .find({
        removed: false,
        ...(filter ? { [filter]: equal } : {}),
        ...fields,
      })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortValue })
      .exec();

    const totalPromise = this.adminUserModel.countDocuments({
      removed: false,
      ...(filter ? { [filter]: equal } : {}),
      ...fields,
    });

    const [result, total] = await Promise.all([resultPromise, totalPromise]);
    const pages = Math.ceil(total / limit);
    const pagination = { page, pages, total };

    if (total > 0) {
      return {
        success: true,
        result,
        pagination,
        message: 'Successfully found all documents',
      };
    }

    return {
      success: true,
      result: [],
      pagination,
      message: 'No documents found',
    };
  }

  async findOne(id: string) {
    const result = await this.adminUserModel
      .findOne({ _id: id, removed: false })
      .exec();

    if (result) {
      return {
        success: true,
        result,
        message: 'Successfully found the document',
      };
    }

    return {
      success: false,
      result: null,
      message: 'Document not found',
    };
  }

  update(id: string) {}
}
