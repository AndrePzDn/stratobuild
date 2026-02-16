import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ClientsModule } from './clients/clients.module';
import { ServiceTypesModule } from './service-types/service-types.module';
import { ProjectTypesModule } from './project-types/project-types.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(configuration().database.uri),
    AuthenticationModule,
    UserModule,
    ClientsModule,
    ServiceTypesModule,
    ProjectTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
