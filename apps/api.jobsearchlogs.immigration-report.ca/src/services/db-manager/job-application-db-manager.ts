import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  AddressDbService,
  CompanyDbService,
  InterviewTypeDbService,
  JobApplicationMediumDbService,
  JobResponseTypeDbService,
  JobSourceDbService,
  JobTypeDbService,
} from '../db';

@Injectable()
export class JobApplicationDbManager {
  constructor(
    private companyDbService: CompanyDbService,
    private addressDbService: AddressDbService,
    private interviewTypeDbService: InterviewTypeDbService,
    private jobApplicationMediumDbService: JobApplicationMediumDbService,
    private jobResponseTypeDbService: JobResponseTypeDbService,
    private jobSourceDbService: JobSourceDbService,
    private jobTypeDbService: JobTypeDbService,
  ) {}
  _client: PrismaClient<any>;
  initiateConnection() {
    this._client = new PrismaClient();
  }
  getClient() {
    return this._client;
  }
  async disconnect() {
    await this._client.$disconnect();
  }
  async getCompanies(userId: number): Promise<any | null> {
    const query = `select id, name from public."Company" where "userId" = $1 ;`;
    return this.getClient().$queryRawUnsafe(query, userId);
  }
  async getInterviewTypes(): Promise<any | null> {
    const query = `select id, name from public."InterviewType" ;`;
    return this.getClient().$queryRawUnsafe(query);
  }
  async getJobApplicationMedium(): Promise<any | null> {
    const query = `select id, name from public."JobApplicationMedium" ;`;
    return this.getClient().$queryRawUnsafe(query);
  }
  async getJobPresenceType(): Promise<any | null> {
    const query = `select id, name from public."JobPresenceType" ;`;
    return this.getClient().$queryRawUnsafe(query);
  }
  async getJobSource(): Promise<any | null> {
    const query = `select id, name from public."JobSource" ;`;
    return this.getClient().$queryRawUnsafe(query);
  }
  async getJobResponseType(): Promise<any | null> {
    const query = `select id, name from public."JobResponseType" ;`;
    return this.getClient().$queryRawUnsafe(query);
  }
  async getJobType(): Promise<any | null> {
    const query = `select id, name from public."JobType" ORDER BY id ASC ;`;
    return this.getClient().$queryRawUnsafe(query);
  }
  async getAllCreateFormData(userId: number): Promise<any | null> {
    const companies = await this.getCompanies(userId);
    const interviewTypes = await this.getInterviewTypes();
    const jobApplicationMediums = await this.getJobApplicationMedium();
    const jobPresenceTypes = await this.getJobPresenceType();
    const jobSources = await this.getJobSource();
    const jobResponseTypes = await this.getJobResponseType();
    const jobTypes = await this.getJobType();
    // console.log('companies', companies, interviewTypes);
    return {
      companies,
      interviewTypes,
      jobApplicationMediums,
      jobPresenceTypes,
      jobSources,
      jobResponseTypes,
      jobTypes,
    };
  }
}
