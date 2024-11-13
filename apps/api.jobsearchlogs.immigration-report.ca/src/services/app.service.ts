import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SessionBodyDto } from '../types';
import { SessionService } from './session/session.service';
import { CompanyDbManager, JobApplicationDbManager } from './db-manager';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly companyDbManager: CompanyDbManager,
    private readonly jobApplicationDbManager: JobApplicationDbManager,
  ) {}
  async processSession(session: SessionBodyDto): Promise<any> {
    return await this.sessionService.process(session);
  }
  async processRefreshToken(user: User): Promise<any> {
    return await this.sessionService.refreshToken(user);
  }
  async createCompany(company: any): Promise<{
    type: 'success';
    message: 'New company created successfully.';
    data: any;
  }> {
    this.companyDbManager.initiateConnection();
    const companyId = await this.companyDbManager.insertCompany(company);
    await this.companyDbManager.disconnect();
    if (typeof companyId === 'number') {
      return {
        type: 'success',
        message: 'New company created successfully.',
        data: {
          companyId,
        },
      };
    }
    throw new InternalServerErrorException();
  }
  async listCompany(userId: number): Promise<any> {
    this.companyDbManager.initiateConnection();
    const companyData = await this.companyDbManager.findAll(userId);
    await this.companyDbManager.disconnect();
    if (Array.isArray(companyData)) {
      return companyData;
    }
    throw new InternalServerErrorException();
  }
  async getFormCreateData(userId: number): Promise<any> {
    this.jobApplicationDbManager.initiateConnection();
    const allCreateFormData =
      await this.jobApplicationDbManager.getAllCreateFormData(userId);
    await this.jobApplicationDbManager.disconnect();
    if (allCreateFormData && allCreateFormData.companies) {
      return allCreateFormData;
    }
    throw new InternalServerErrorException();
  }
}
