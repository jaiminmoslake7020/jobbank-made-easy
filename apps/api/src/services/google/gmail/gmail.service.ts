import { Injectable } from '@nestjs/common';

@Injectable()
export class GmailService {
  constructor() {}
  async processSearchJobs(): Promise<[]> {
    return [];
  }
}
