import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { WebcrawlingService } from './webcrawling.service';
import {
  CompanyDetailsService,
  HowToApplyService,
  JobDetailsService,
  JobSearchService,
} from './cheerio';
import { JobBankUrlService } from './jobbank-url';
import { JOB_NOT_FOUND } from '../constants/jobbank';
import {
  CompanyDetailsType,
  ErrorType,
  HowToApplyResponseType,
  JobDetailsAllType,
  JobDetailsType,
  SearchJobType,
  SearchConfigType,
} from 'types';

@Injectable()
export class AppService {
  constructor(
    private readonly webCrawlingService: WebcrawlingService,
    private readonly cheerioService: HowToApplyService,
    private readonly jobbankUrlService: JobBankUrlService,
    private readonly jobSearchService: JobSearchService,
    private readonly jobDetailsService: JobDetailsService,
    private readonly companyDetailsService: CompanyDetailsService,
  ) {}
  async processSearch(url: string): Promise<{
    jobs: SearchJobType[];
    hasMoreJobs: boolean;
  }> {
    const jobsData = await this.webCrawlingService.get(url);
    if (typeof jobsData === 'string') {
      return this.jobSearchService.searchJobs(jobsData);
    }
    return {
      jobs: [],
      hasMoreJobs: false,
    };
  }
  async processSearchJobs(
    searchConfig: SearchConfigType,
  ): Promise<SearchJobType[] | ErrorType> {
    const url = this.jobbankUrlService.getJobSearchUrl(searchConfig);
    let { jobs, hasMoreJobs } = await this.processSearch(url);
    let page = 2;
    while (hasMoreJobs && page <= 25) {
      const { jobs: jobs1, hasMoreJobs: hasMoreJobsOverride } =
        await this.processSearch(url + '&page=' + page);
      hasMoreJobs = hasMoreJobsOverride;
      if (Array.isArray(jobs) && Array.isArray(jobs1)) {
        jobs = [...jobs, ...jobs1];
      }
      if (jobs1.length === 0) {
        hasMoreJobs = false;
      }
      page++;
    }
    return jobs;
  }
  getJobDetailsUrl(jobLinkId: number, isLmiaParsed: boolean) {
    return this.jobbankUrlService.getJobDetailsUrl(jobLinkId, isLmiaParsed);
  }
  async quickLmiaCheck(
    jobLinkId: number,
    isLmiaParsed: boolean,
  ): Promise<boolean> {
    const url = this.getJobDetailsUrl(jobLinkId, isLmiaParsed);
    const jobsData = await this.webCrawlingService.get(url);
    if (typeof jobsData === 'string') {
      return this.jobDetailsService.validateLmia(jobsData);
    }
    return false;
  }
  async getJobDetails(
    jobLinkId: number,
    isLmiaParsed: boolean,
  ): Promise<JobDetailsAllType> {
    const url = this.getJobDetailsUrl(jobLinkId, isLmiaParsed);
    const jobsData = await this.webCrawlingService.get(url);
    if (typeof jobsData === 'string') {
      const data = this.jobDetailsService.processData(jobsData);
      if (data === JOB_NOT_FOUND) {
        throw new NotFoundException(`Item with ID ${jobLinkId} not found`);
      }
      if (!Object.hasOwnProperty.call(data, 'title')) {
        throw new InternalServerErrorException('Job details failed.');
      }
      if (data && data['title']) {
        const companyData = this.companyDetailsService.processData(jobsData);
        if (Object.hasOwnProperty.call(companyData, 'message')) {
          throw new InternalServerErrorException('Company Data failed.');
        }
        const howToApply = await this.getApplyEmail(jobLinkId, url);
        if (Object.hasOwnProperty.call(howToApply, 'message')) {
          throw new InternalServerErrorException('How To Apply failed.');
        }
        return {
          ...(data as JobDetailsType),
          ...(howToApply as HowToApplyResponseType),
          companyData: companyData as CompanyDetailsType,
          jobLinkUrl: url,
          jobbank_link_id: jobLinkId,
        };
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
    throw new InternalServerErrorException('An unexpected error occurred');
  }
  async getApplyEmail(
    jobId: number,
    url: string,
  ): Promise<HowToApplyResponseType | ErrorType> {
    const data = await this.webCrawlingService.getHowToApplyAjaxData(
      url,
      jobId,
    );
    if (typeof data === 'string') {
      return this.cheerioService.processHowToApplyAjaxResponse(data);
    } else {
      return data;
    }
  }
}
