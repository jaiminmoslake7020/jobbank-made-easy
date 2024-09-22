import { Injectable } from '@nestjs/common';
import { JobDetailsAllType, SearchConfigType, SessionBodyDto } from '../types';
import { SearchJobsDbManager } from './db-manager';
import { SessionService } from './session/session.service';
import {User} from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    private readonly searchJobsDbManager: SearchJobsDbManager,
    private readonly sessionService: SessionService,
  ) {}
  async processSearchJobs(
    searchConfig: SearchConfigType,
  ): Promise<JobDetailsAllType[]> {
    this.searchJobsDbManager.initiateConnection();
    const jobs = await this.searchJobsDbManager.findAllJobs(searchConfig);
    await this.searchJobsDbManager.disconnect();
    return jobs;
  }
  async processSession(session: SessionBodyDto): Promise<any> {
    return await this.sessionService.process(session);
  }
  async processRefreshToken(user: User): Promise<any> {
    return await this.sessionService.refreshToken(user);
  }
}
