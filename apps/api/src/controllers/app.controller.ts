import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query, Req,
  UseGuards,
} from '@nestjs/common';
import { AppService, SearchJobsDbManager } from '../services/';
import { JobDetailsAllType, SessionBodyDto } from '../types';
import { AuthGuard } from '../guards';
import {User} from '@prisma/client';

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

  @Post('/session')
  async authSession(@Body() session: SessionBodyDto): Promise<any> {
    return await this.appService.processSession(session);
  }

  @UseGuards(AuthGuard)
  @Get('/refresh-token')
  async refreshToken(@Req() request: Request): Promise<any> {
    const user = (request as any).user as User;
    return await this.appService.processRefreshToken(user);
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
