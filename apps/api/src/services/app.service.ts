import { Injectable } from '@nestjs/common';
import { JobDetailsAllType, SearchConfigType } from 'types';
import { SearchJobsDbManager } from './db-manager';

@Injectable()
export class AppService {
  constructor(private readonly searchJobsDbManager: SearchJobsDbManager) {}
  async processSearchJobs(
    searchConfig: SearchConfigType,
  ): Promise<JobDetailsAllType[]> {
    this.searchJobsDbManager.initiateConnection();
    const jobs = await this.searchJobsDbManager.findAllJobs(searchConfig);
    await this.searchJobsDbManager.disconnect();
    return jobs;
  }
}
