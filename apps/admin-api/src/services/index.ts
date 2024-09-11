import { AppService } from './app.service';
import { WebcrawlingService } from './webcrawling.service';
import {
  HowToApplyService,
  JobSearchService,
  JobDetailsService,
  CompanyDetailsService,
  JobNotFoundType,
} from './cheerio';
import { JobBankUrlService } from './jobbank-url';
import {
  DbService,
  SearchDbService,
  SearchDataType,
  IndustryDataType,
  IndustryDbService,
  WageUnitDbService,
  WageUnitDataType,
  CompanyDataType,
  CompanyDbService,
  CompanySizeDataType,
  CompanySizeDbService,
  RequiredItemDbService,
  JobDbService,
  RequiredItemDataType,
  JobSearchResultsDbService,
} from './db';
import { JobDetailsDbManagerService } from './db-manager';

export {
  AppService,
  JobBankUrlService,
  WebcrawlingService,
  HowToApplyService,
  JobSearchService,
  DbService,
  SearchDbService,
  JobDetailsService,
  CompanyDetailsService,
  JobDetailsDbManagerService,
  IndustryDbService,
  WageUnitDbService,
  CompanyDbService,
  CompanySizeDbService,
  RequiredItemDbService,
  JobDbService,
  JobSearchResultsDbService,
};

export type {
  SearchDataType,
  JobNotFoundType,
  IndustryDataType,
  WageUnitDataType,
  CompanyDataType,
  CompanySizeDataType,
  RequiredItemDataType,
};
