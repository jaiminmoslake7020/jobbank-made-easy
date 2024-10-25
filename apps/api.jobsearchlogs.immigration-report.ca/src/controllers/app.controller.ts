import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService, SearchJobsDbManager } from '../services/';
import { SessionBodyDto } from '../types';
import { AuthGuard } from '../guards';
import { User } from '@prisma/client';

export type ExampleResponseType = {
  message: string;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly searchJobsDbManager: SearchJobsDbManager,
  ) {}

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
}
