import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { JobPresenceType, PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class JobPresenceTypeDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }

  getTable(): Prisma.JobPresenceTypeDelegate<any> {
    this.setTableName('job-presence-type');
    return this._prisma.JobPresenceType;
  }

  async create(
    data: Prisma.JobPresenceTypeUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobPresenceType | number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data,
      });
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return createdItem as any as JobPresenceType;
      }
      return createdItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async update(
    data: Prisma.JobPresenceTypeUncheckedUpdateInput,
    id: number,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobPresenceType | number | ErrorType> {
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
        return updatedItem as any as JobPresenceType;
      }
      return updatedItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async find(
    data: Prisma.JobPresenceTypeUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobPresenceType | number | null | ErrorType> {
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
        return foundItem as any as JobPresenceType;
      }
      return foundItem.id as number;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }

  async findObject(
    data: Prisma.JobPresenceTypeUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobPresenceType | null | ErrorType> {
    return (await this.find(data, true, endConnection)) as
      | JobPresenceType
      | null
      | ErrorType;
  }

  async findObjectId(
    data: Prisma.JobPresenceTypeUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.find(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }

  async createObject(
    data: Prisma.JobPresenceTypeUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobPresenceType | null | ErrorType> {
    return (await this.create(data, true, endConnection)) as
      | JobPresenceType
      | null
      | ErrorType;
  }

  async createObjectId(
    data: Prisma.JobPresenceTypeUncheckedCreateInput,
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
      | Prisma.JobPresenceTypeUncheckedCreateInput
      | Prisma.JobPresenceTypeUncheckedUpdateInput,
    endConnection: boolean,
  ): Promise<JobPresenceType | ErrorType> {
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
      )) as JobPresenceType;
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
