import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from '../services/';
import { AuthGuard } from '../guards';
import { CreateCompanyDto } from '../types';
import { User } from '@prisma/client';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

export type ExampleResponseType = {
  message: string;
};

@Controller()
export class CompanyController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Post('/company')
  @ApiHeader({
    name: 'authorization',
    description: 'A custom header for authorization',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    example: {
      type: 'success',
      message: 'New company created successfully.',
    },
  })
  async postCompany(
    @Req() request: Request,
    @Body() company: CreateCompanyDto,
  ): Promise<{
    type: 'success';
    message: 'New company created successfully.';
  }> {
    const user = (request as any).user as User;
    return await this.appService.createCompany({ ...company, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Get('/company')
  @ApiHeader({
    name: 'authorization',
    description: 'A custom header for authorization',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  async listCompany(@Req() request: Request) {
    const user = (request as any).user as User;
    return await this.appService.listCompany(user.id);
  }
}
