import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import {
  AppService,
  SearchJobsDbManager,
  SessionService,
  GmailService,
  AuthService,
  UserDbService,
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
  controllers: [AppController],
  providers: [
    AppService,
    SearchJobsDbManager,
    SessionService,
    GmailService,
    AuthService,
    UserDbService,
    AuthGuard,
  ],
})
export class AppModule {}
