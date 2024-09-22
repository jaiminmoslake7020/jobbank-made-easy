import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class JobDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }
  getTable(): Prisma.JobDelegate<any> {
    this.setTableName('job');
    return this._prisma.job;
  }
  async create(
    data: Prisma.JobUncheckedCreateInput,
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
      return this.getError(this.context_create, e);
    }
  }
  async find(
    data:
      | Prisma.JobUncheckedCreateInput
      | Prisma.JobJobbank_link_idIs_lmiaCompoundUniqueInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    try {
      const foundItem = await this.getTable().findUnique({
        where: {
          jobbank_link_id_is_lmia: {
            jobbank_link_id: data.jobbank_link_id,
            is_lmia: data.is_lmia,
          },
        },
      });
      if (foundItem === null) {
        if (endConnection) {
          await this.disconnect();
        }
        return null;
      }
      const id = foundItem.id;
      if (endConnection) {
        await this.disconnect();
      }
      return id;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }
  async findOrCreate(
    data: Prisma.JobUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | ErrorType> {
    const foundItemId = await this.find(data, false);
    if (typeof foundItemId === 'number') {
      if (endConnection) {
        await this.disconnect();
      }
      return foundItemId;
    } else {
      const createdItemId = await this.create(data, true);
      if (typeof createdItemId === 'number') {
        return createdItemId;
      }
      return createdItemId;
    }
  }
}
