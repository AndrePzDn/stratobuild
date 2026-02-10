import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser } from './entities/admin-user.entity';
import { LoginDto } from './dto/login.dto';
import { AdminPassword } from './entities/admin-password.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/authentication-response.dto';
import { AuthRequest } from './guards/auth.guard';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel('AdminUser') private adminUserModel: Model<AdminUser>,
    @InjectModel('AdminPassword')
    private adminPasswordModel: Model<AdminPassword>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user)
      throw new UnauthorizedException({
        success: false,
        result: null,
        message: 'Invalid credentials',
      });

    const payload = {
      _id: user._id,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    await this.adminPasswordModel
      .findOneAndUpdate(
        { user: user._id },
        { $push: { loggedSessions: token } },
        { new: true },
      )
      .exec();

    const userObj = user.toObject();

    const responseDto: AuthResponseDto = {
      _id: userObj._id.toString(),
      name: userObj.name,
      surname: userObj.surname,
      role: userObj.role,
      email: userObj.email,
      photo: userObj.photo,
      haveToUpdatePassword: userObj.haveToUpdatePassword,
      token,
    };

    return {
      success: true,
      result: responseDto,
      message: 'Authentication successful',
    };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.adminUserModel
      .findOne({ email: loginDto.email })
      .exec();
    if (!user) return null;

    const adminPassword = await this.adminPasswordModel
      .findOne({ user: user._id })
      .exec();
    if (!adminPassword) return null;

    const isMatch = await compare(loginDto.password, adminPassword.password);
    if (!isMatch) return null;

    return user;
  }

  async logout(request: Request) {
    const authRequest = request as AuthRequest;
    const token: string = authRequest.headers['authorization']?.split(' ')[1];
    await this.adminPasswordModel
      .findOneAndUpdate(
        { user: authRequest.admin._id },
        { $pull: { loggedSessions: token } },
        { new: true },
      )
      .exec();

    return {
      success: true,
      result: null,
      message: 'Logout successful',
    };
  }
}
