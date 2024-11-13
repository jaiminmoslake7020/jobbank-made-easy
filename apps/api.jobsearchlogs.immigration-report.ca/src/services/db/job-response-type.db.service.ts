import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { JobResponseType, PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class JobResponseTypeDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }

  getTable(): Prisma.JobResponseTypeDelegate<any> {
    this.setTableName('job-response-type');
    return this._prisma.JobResponseType;
  }

  async create(
    data: Prisma.JobResponseTypeUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobResponseType | number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data,
      });
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return createdItem as any as JobResponseType;
      }
      return createdItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async update(
    data: Prisma.JobResponseTypeUncheckedUpdateInput,
    id: number,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobResponseType | number | ErrorType> {
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
        return updatedItem as any as JobResponseType;
      }
      return updatedItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async find(
    data: Prisma.JobResponseTypeUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobResponseType | number | null | ErrorType> {
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
        return foundItem as any as JobResponseType;
      }
      return foundItem.id as number;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }

  async findObject(
    data: Prisma.JobResponseTypeUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobResponseType | null | ErrorType> {
    return (await this.find(data, true, endConnection)) as
      | JobResponseType
      | null
      | ErrorType;
  }

  async findObjectId(
    data: Prisma.JobResponseTypeUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.find(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }

  async createObject(
    data: Prisma.JobResponseTypeUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobResponseType | null | ErrorType> {
    return (await this.create(data, true, endConnection)) as
      | JobResponseType
      | null
      | ErrorType;
  }

  async createObjectId(
    data: Prisma.JobResponseTypeUncheckedCreateInput,
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
      | Prisma.JobResponseTypeUncheckedCreateInput
      | Prisma.JobResponseTypeUncheckedUpdateInput,
    endConnection: boolean,
  ): Promise<JobResponseType | ErrorType> {
    const foundItem = await this.findObject(data, false);
    if (foundItem && foundItem['id']) {
      if (endConnection) {
        await this.disconnect();
      }
      return (await this.update(data, foundItem['id'], true, false)) as JobResponseType;
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
