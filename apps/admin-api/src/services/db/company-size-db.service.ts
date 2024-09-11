import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { Prisma } from '.prisma/client';
import { PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';

export type CompanySizeDataType = {
  name: string;
  description: string;
};

@Injectable()
export class CompanySizeDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }
  getTable(): Prisma.CompanySizeDelegate<any> {
    this.setTableName('companySize');
    return this._prisma.companySize;
  }
  async create(
    data: CompanySizeDataType,
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
    data: CompanySizeDataType,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    try {
      const foundItem = await this.getTable().findUnique({
        where: {
          name: data.name,
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
    data: CompanySizeDataType,
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
