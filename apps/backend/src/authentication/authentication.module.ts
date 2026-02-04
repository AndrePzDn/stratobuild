import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUserSchema } from './entities/admin-user.entity';
import { AdminPasswordSchema } from './entities/admin-password.entity';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AdminUser', schema: AdminUserSchema },
      { name: 'AdminPassword', schema: AdminPasswordSchema },
    ]),
    JwtModule.register({
      secret: configuration().jwt.secret,
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
