import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { Prisma } from '.prisma/client';
import { PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';

export type JobWageUnitDataType = {
  name: string;
  wage_id?: string;
  job_id: string;
  min_value: string;
  max_value?: string;
  unit_text: string;
  work_hours: string;
};

@Injectable()
export class JobWageUnitDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }
  getTable(): Prisma.WageUnitDelegate<any> {
    this.setTableName('jobWageUnit');
    return this._prisma.jobWageUnit;
  }
  async create(
    data: JobWageUnitDataType,
    endConnection: boolean,
  ): Promise<number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data,
      });
      const id = createdItem.id;
      if (endConnection) {
        await this.disconnect();
      }
      return id;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }
}
