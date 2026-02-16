import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ClientsModule } from './clients/clients.module';
import { ServiceTypesModule } from './service-types/service-types.module';
import { ProjectTypesModule } from './project-types/project-types.module';
import { UnitOfMeasurementsModule } from './unit-of-measurements/unit-of-measurements.module';
import { MaterialsModule } from './materials/materials.module';
import { LaborTypesModule } from './labor-types/labor-types.module';
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
    UnitOfMeasurementsModule,
    MaterialsModule,
    LaborTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
