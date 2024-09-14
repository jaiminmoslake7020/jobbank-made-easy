import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService, SearchJobsDbManager } from '../services/';
import { JobDetailsAllType } from 'types';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export type ExampleResponseType = {
  message: string;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly searchJobsDbManager: SearchJobsDbManager,
  ) {}

  @Get('/search-keys')
  async searchJobKeys(): Promise<string[]> {
    this.searchJobsDbManager.initiateConnection();
    const results = await this.searchJobsDbManager.findSearchKeys();
    await this.searchJobsDbManager.disconnect();
    return results;
  }

  @Get('/session')
  async authSession() {
    const p = await NextAuth({
      providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
      ],
    });
    return p.res;
  }

  @Get('/search')
  async searchJobs(
    @Query('search') search: string,
    @Query('location') location: string,
    @Query('isLmia') isLmia: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<JobDetailsAllType[]> {
    const parsedPage = page && !isNaN(Number(page)) ? Number(page) : 0;
    const parsedLimit = limit && !isNaN(Number(limit)) ? Number(limit) : 10;
    const searchConfig = {
      search,
      location,
      isLmia: Boolean(isLmia === 'true'),
      page: parsedPage,
      limit: parsedLimit,
    };
    if (search !== '') {
      return this.appService.processSearchJobs(searchConfig);
    } else {
      throw new BadRequestException('Please provide a search.');
    }
  }
}
