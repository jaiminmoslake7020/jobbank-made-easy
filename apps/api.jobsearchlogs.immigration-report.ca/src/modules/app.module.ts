import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AppController,
  CompanyController,
  JobApplicationController,
} from '../controllers';
import {
  AppService,
  JobApplicationDbManager,
  SessionService,
  AuthService,
  UserDbService,
  CompanyDbService,
  AddressDbService,
  CompanyDbManager,
  DbService,
  InterviewTypeDbService,
  JobApplicationMediumDbService,
  JobResponseTypeDbService,
  JobTypeDbService,
  JobPresenceTypeDbService,
  JobSourceDbService,
} from '../services';
import { validationSchemaForEnv } from '../config/environment-variables';
import { PersistenceModule } from '../persistence/persistence.module';
import { AuthGuard } from '../guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
    }),
    PersistenceModule,
  ],
  controllers: [AppController, CompanyController, JobApplicationController],
  providers: [
    AppService,
    JobApplicationDbManager,
    SessionService,
    AuthService,
    UserDbService,
    AuthGuard,
    DbService,
    CompanyDbService,
    AddressDbService,
    CompanyDbManager,
    InterviewTypeDbService,
    JobApplicationMediumDbService,
    JobResponseTypeDbService,
    JobTypeDbService,
    JobPresenceTypeDbService,
    JobSourceDbService,
  ],
})
export class AppModule {}
