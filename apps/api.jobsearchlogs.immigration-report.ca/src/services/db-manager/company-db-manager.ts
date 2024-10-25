import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DbService, CompanyDbService } from './../db';

@Injectable()
export class JobApplicationDbManager {
  constructor(
    private dbService: DbService,
    private companyDbService: CompanyDbService,
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
}
