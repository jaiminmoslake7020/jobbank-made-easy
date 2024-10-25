import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { JobApplicationMedium, PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class JobApplicationMediumDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }

  getTable(): Prisma.JobApplicationMediumDelegate<any> {
    this.setTableName('job-application-medium');
    return this._prisma.JobApplicationMedium;
  }

  async create(
    data: Prisma.JobApplicationMediumUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobApplicationMedium | number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data,
      });
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return createdItem as any as JobApplicationMedium;
      }
      return createdItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async update(
    data: Prisma.JobApplicationMediumUncheckedUpdateInput,
    id: number,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobApplicationMedium | number | ErrorType> {
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
        return updatedItem as any as JobApplicationMedium;
      }
      return updatedItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async find(
    data: Prisma.JobApplicationMediumUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<JobApplicationMedium | number | null | ErrorType> {
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
        return foundItem as any as JobApplicationMedium;
      }
      return foundItem.id as number;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }

  async findObject(
    data: Prisma.JobApplicationMediumUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobApplicationMedium | null | ErrorType> {
    return (await this.find(data, true, endConnection)) as
      | JobApplicationMedium
      | null
      | ErrorType;
  }

  async findObjectId(
    data: Prisma.JobApplicationMediumUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.find(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }

  async createObject(
    data: Prisma.JobApplicationMediumUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<JobApplicationMedium | null | ErrorType> {
    return (await this.create(data, true, endConnection)) as
      | JobApplicationMedium
      | null
      | ErrorType;
  }

  async createObjectId(
    data: Prisma.JobApplicationMediumUncheckedCreateInput,
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
      | Prisma.JobApplicationMediumUncheckedCreateInput
      | Prisma.JobApplicationMediumUncheckedUpdateInput,
    endConnection: boolean,
  ): Promise<JobApplicationMedium | ErrorType> {
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
      )) as JobApplicationMedium;
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
