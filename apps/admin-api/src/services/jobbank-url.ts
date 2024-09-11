import { Injectable } from '@nestjs/common';
import {
  howToApplyUrl,
  jobIdConst,
  jobpostingTfwUrl,
  jobpostingUrl,
  lmiaConst,
  lmiaValue,
  locationConst,
  searchConst,
  searchJobsUrl,
} from '../constants/jobbank';
import { SearchConfigType } from 'types';

@Injectable()
export class JobBankUrlService {
  getHowToApplyUrl(jobId: string): string {
    return howToApplyUrl.replace(jobIdConst, jobId);
  }
  getJobDetailsUrl(jobId: number, isLmia: boolean): string {
    if (isLmia) {
      return jobpostingTfwUrl.replace(jobIdConst, String(jobId));
    } else {
      return jobpostingUrl.replace(jobIdConst, String(jobId));
    }
  }
  getJobSearchUrl(searchConfig: SearchConfigType): string {
    const searchObject = {
      [searchConst]: searchConfig.search,
      [locationConst]: searchConfig.location,
    } as any;
    if (searchConfig.isLmia) {
      searchObject[lmiaConst] = String(lmiaValue);
    }
    searchObject['sort'] = 'M';
    const finalUrl = new URLSearchParams(searchObject);
    return searchJobsUrl + String(finalUrl);
  }
  moreJobsUrl(): string {
    return 'https://www.jobbank.gc.ca/jobsearch/job_search_loader.xhtml';
  }
}
