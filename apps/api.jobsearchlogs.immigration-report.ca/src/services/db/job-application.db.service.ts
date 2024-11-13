import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { JobApplication, PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class JobApplicationDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }
  getTable(): Prisma.JobApplicationDelegate<any> {
    this.setTableName('job-application');
    return this._prisma.JobApplication;
  }
  async create(
    data: Prisma.JobApplicationUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobApplication | number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data,
      });
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return createdItem as any as JobApplication;
      }
      return createdItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }
  async update(
    data: Prisma.JobApplicationUncheckedUpdateInput,
    id: number,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobApplication | number | ErrorType> {
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
        return updatedItem as any as JobApplication;
      }
      return updatedItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }
  async find(
    data: Prisma.JobApplicationUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobApplication | number | null | ErrorType> {
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
        return foundItem as any as JobApplication;
      }
      return foundItem.id as number;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }
  async findObject(
    data: Prisma.JobApplicationUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobApplication | null | ErrorType> {
    return (await this.find(data, true, endConnection)) as
      | JobApplication
      | null
      | ErrorType;
  }
  async findObjectId(
    data: Prisma.JobApplicationUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.find(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }
  async createObject(
    data: Prisma.JobApplicationUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobApplication | null | ErrorType> {
    return (await this.create(data, true, endConnection)) as
      | JobApplication
      | null
      | ErrorType;
  }
  async createObjectId(
    data: Prisma.JobApplicationUncheckedCreateInput,
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
      | Prisma.JobApplicationUncheckedCreateInput
      | Prisma.JobApplicationUncheckedUpdateInput,
    endConnection: boolean,
  ): Promise<JobApplication | ErrorType> {
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
      )) as JobApplication;
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
