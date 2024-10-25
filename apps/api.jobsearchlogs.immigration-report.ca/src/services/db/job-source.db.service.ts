import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { JobSource, PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class JobSourceDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }

  getTable(): Prisma.JobSourceDelegate<any> {
    this.setTableName('job-source');
    return this._prisma.JobSource;
  }

  async create(
    data: Prisma.JobSourceUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobSource | number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data,
      });
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return createdItem as any as JobSource;
      }
      return createdItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async update(
    data: Prisma.JobSourceUncheckedUpdateInput,
    id: number,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobSource | number | ErrorType> {
    try {
      const updatedItem = await this.getTable().update({
        data: data,
        where: {
          id: id,
        },
      });
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return updatedItem as any as JobSource;
      }
      return updatedItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async find(
    data: Prisma.JobSourceUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobSource | number | null | ErrorType> {
    try {
      const foundItem = await this.getTable().findUnique({
        where: {
          id: data.id,
        },
      });
      if (foundItem === null) {
        if (endConnection) {
          await this.disconnect();
        }
        return null;
      }
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return foundItem as any as JobSource;
      }
      return foundItem.id as number;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }

  async findObject(
    data: Prisma.JobSourceUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobSource | null | ErrorType> {
    return (await this.find(data, true, endConnection)) as
      | JobSource
      | null
      | ErrorType;
  }

  async findObjectId(
    data: Prisma.JobSourceUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.find(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }

  async createObject(
    data: Prisma.JobSourceUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobSource | null | ErrorType> {
    return (await this.create(data, true, endConnection)) as
      | JobSource
      | null
      | ErrorType;
  }

  async createObjectId(
    data: Prisma.JobSourceUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.create(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }

  async findOrCreate(
    data:
      | any
      | Prisma.JobSourceUncheckedCreateInput
      | Prisma.JobSourceUncheckedUpdateInput,
    endConnection: boolean,
  ): Promise<JobSource | ErrorType> {
    const foundItem = await this.findObject(data, false);
    if (foundItem && foundItem['id']) {
      if (endConnection) {
        await this.disconnect();
      }
      return (await this.update(
        data,
        foundItem['id'],
        true,
        false,
      )) as JobSource;
    } else {
      const createdItem = await this.createObject(data, false);
      if (createdItem && createdItem['id']) {
        if (endConnection) {
          await this.disconnect();
        }
        return createdItem;
      }
      return createdItem;
    }
  }
}
