import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import { AppService, SearchJobsDbManager } from '../services';
import { validationSchemaForEnv } from '../config/environment-variables';
import { PersistenceModule } from '../persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
    }),
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [AppService, SearchJobsDbManager],
})
export class AppModule {}
