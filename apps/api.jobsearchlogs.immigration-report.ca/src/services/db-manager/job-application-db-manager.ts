import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobApplicationDbManager {
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
