import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { Prisma } from '.prisma/client';
import { PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';

export type IndustryDataType = {
  name: string;
};

@Injectable()
export class IndustryDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }
  getTable(): Prisma.IndustryDelegate<any> {
    this.setTableName('industry');
    return this._prisma.industry;
  }
  async create(
    data: IndustryDataType,
    endConnection: boolean,
  ): Promise<number | ErrorType> {
    try {
      const oneSearch = await this.getTable().create({
        data: data,
      });
      const id = oneSearch.id;
      if (endConnection) {
        await this.disconnect();
      }
      return id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }
  async find(
    data: IndustryDataType,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    try {
      const industryItem = await this.getTable().findUnique({
        where: {
          name: data.name,
        },
      });
      if (industryItem === null) {
        if (endConnection) {
          await this.disconnect();
        }
        return null;
      }
      const id = industryItem.id;
      if (endConnection) {
        await this.disconnect();
      }
      return id;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }
  async findOrCreate(
    data: IndustryDataType,
    endConnection: boolean,
  ): Promise<number | ErrorType> {
    const industry = await this.find(data, false);
    if (typeof industry === 'number') {
      if (endConnection) {
        await this.disconnect();
      }
      return industry;
    } else {
      const industryItem = await this.create(data, true);
      if (typeof industry === 'number') {
        return industryItem;
      }
      return industryItem;
    }
  }
}
