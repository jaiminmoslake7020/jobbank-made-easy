import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import {
  AppService,
  WebcrawlingService,
  HowToApplyService,
  JobBankUrlService,
  JobSearchService,
  JobDetailsService,
  CompanyDetailsService,
  JobDetailsDbManagerService,
  DbService,
  SearchDbService,
  WageUnitDbService,
  IndustryDbService,
  CompanyDbService,
  CompanySizeDbService,
  RequiredItemDbService,
  JobDbService,
  JobSearchResultsDbService,
} from '../services';
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
  providers: [
    AppService,
    WebcrawlingService,
    HowToApplyService,
    JobBankUrlService,
    JobSearchService,
    SearchDbService,
    JobDetailsService,
    CompanyDetailsService,
    DbService,
    JobDetailsDbManagerService,
    WageUnitDbService,
    IndustryDbService,
    CompanyDbService,
    CompanySizeDbService,
    RequiredItemDbService,
    JobDbService,
    JobSearchResultsDbService,
  ],
})
export class AppModule {}
