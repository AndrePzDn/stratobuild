import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationQuery } from '../interfaces/pagination-query.interface';

export class BaseService<Schema> {
  constructor(protected readonly model: Model<Schema>) {}

  async create(data) {
    const result = await new this.model(data).save();

    return {
      success: true,
      result,
      message: 'Document created successfully',
    };
  }

  async findAll(query: PaginationQuery) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'enabled',
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

    const result = await this.model
      .find({
        removed: false,
        ...(filter ? { [filter]: equal } : {}),
        ...fields,
      })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortValue })
      .exec();

    const total = await this.model.countDocuments(fields).exec();
    const pages = Math.ceil(total / limit);
    const pagination = { page, pages, total };

    return {
      success: true,
      result,
      pagination,
      message: 'Successfully found all documents',
    };
  }

  async findOne(id: string) {
    const result = await this.model.findOne({ _id: id, removed: false }).exec();

    if (!result) {
      throw new NotFoundException({
        success: false,
        message: 'Document not found',
        result: null,
      });
    }

    return {
      success: true,
      result,
      message: 'Successfully found the document',
    };
  }

  async update(id: string, data) {
    const result = await this.model
      .findOneAndUpdate({ _id: id, removed: false }, data, { new: true })
      .exec();

    if (!result) {
      throw new NotFoundException({
        success: false,
        message: 'Document not found',
        result: null,
      });
    }

    return {
      success: true,
      result,
      message: 'Document updated successfully',
    };
  }

  async remove(id: string) {
    const result = await this.model
      .findOneAndUpdate({ _id: id }, { $set: { removed: true } }, { new: true })
      .exec();

    if (!result) {
      throw new NotFoundException({
        success: false,
        message: 'Document not found',
        result: null,
      });
    }

    return {
      success: true,
      result,
      message: 'Document removed successfully',
    };
  }
}
