import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import {
  AppService,
  JobApplicationDbManager,
  SessionService,
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
    JobApplicationDbManager,
    SessionService,
    AuthService,
    UserDbService,
    AuthGuard,
  ],
})
export class AppModule {}
