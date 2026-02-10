import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUserSchema } from 'src/authentication/entities/admin-user.entity';
import { AdminPasswordSchema } from 'src/authentication/entities/admin-password.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AdminUser', schema: AdminUserSchema },
      { name: 'AdminPassword', schema: AdminPasswordSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
