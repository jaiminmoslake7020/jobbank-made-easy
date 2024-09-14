import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { AppService } from '../services/';
import { JobDetailsDbManagerService } from '../services';
import { JobDetailsAllType, JobSearchResultsType } from 'types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jobDetailsDbManagerService: JobDetailsDbManagerService,
  ) {}

  @Get('/search-keys')
  async searchJobKeys(): Promise<string[]> {
    this.jobDetailsDbManagerService.initiateConnection();
    const results = await this.jobDetailsDbManagerService.findSearchKeys();
    await this.jobDetailsDbManagerService.disconnect();
    return results;
  }

  @Get('/search')
  async searchJobs(
    @Query('search') search: string,
    @Query('location') location: string,
    @Query('isLmia') isLmia: string,
  ): Promise<JobSearchResultsType> {
    const isLmiaParsed = isLmia === 'true';
    const searchConfig = {
      search,
      location,
      isLmia: isLmiaParsed,
    };
    if (String(search) === '') {
      throw new BadRequestException('Please input search option.');
    }
    let jobs = await this.appService.processSearchJobs(searchConfig);
    if (!Array.isArray(jobs)) {
      throw new InternalServerErrorException('processSearchJobs failed');
    }
    this.jobDetailsDbManagerService.initiateConnection();
    const searchId =
      await this.jobDetailsDbManagerService.insertSearchDetails(searchConfig);
    if (typeof searchId === 'number') {
      jobs = await this.jobDetailsDbManagerService.attachJobLinksToSearch(
        jobs,
        searchId,
      );
      await this.jobDetailsDbManagerService.disconnect();
      return {
        jobs: jobs,
        searchId: searchId,
      };
    } else {
      await this.jobDetailsDbManagerService.disconnect();
      throw new InternalServerErrorException('insertSearchDetails failed');
    }
  }

  @Get('/job-details')
  async getJobDetails(
    @Query('id') jobLinkId: string,
    @Query('isLmia') isLmia: string,
  ): Promise<JobDetailsAllType> {
    let isLmiaParsed = isLmia === 'true';
    const jobLinkIdParsed = Number(jobLinkId);
    if (isLmiaParsed === false) {
      isLmiaParsed = await this.appService.quickLmiaCheck(
        jobLinkIdParsed,
        isLmiaParsed,
      );
    }
    if (typeof jobLinkIdParsed === 'number') {
      this.jobDetailsDbManagerService.initiateConnection();
      const jobId = await this.jobDetailsDbManagerService.findJobByJobLinkId(
        jobLinkIdParsed,
        isLmiaParsed,
      );
      if (typeof jobId === 'number') {
        const jobdata =
          await this.jobDetailsDbManagerService.findJobData(jobId);
        if (jobdata !== null) {
          return {
            ...jobdata,
            query: true,
            jobLinkUrl: this.appService.getJobDetailsUrl(
              jobLinkIdParsed,
              isLmiaParsed,
            ),
          };
        }
      }
      const jobDetails = await this.appService.getJobDetails(
        jobLinkIdParsed,
        isLmiaParsed,
      );
      const job_id =
        await this.jobDetailsDbManagerService.insertJobDetails(jobDetails);
      if (typeof job_id === 'number') {
        await this.jobDetailsDbManagerService.attachJobToSearch(
          jobLinkIdParsed,
          isLmiaParsed,
          job_id,
        );
      }
      await this.jobDetailsDbManagerService.disconnect();
      return {
        ...jobDetails,
        job_id: job_id,
      };
    }
    throw new ForbiddenException('Invalid jobLinkId.');
  }
}
