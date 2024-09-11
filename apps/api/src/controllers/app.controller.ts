import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../services/';
import { JobDetailsAllType } from 'types';

export type ExampleResponseType = {
  message: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/search')
  async searchJobs(
    @Query('search') search: string,
    @Query('location') location: string,
    @Query('isLmia') isLmia: string,
    @Query('isLmia') page: string,
    @Query('isLmia') limit: string,
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
    if (search !== '' && location !== '') {
      return this.appService.processSearchJobs(searchConfig);
    } else {
      throw new BadRequestException('Please provide a search.');
    }
  }
}
