import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { InterviewType, PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class InterviewTypeDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }

  getTable(): Prisma.InterviewTypeDelegate<any> {
    this.setTableName('interview-type');
    return this._prisma.InterviewType;
  }

  async create(
    data: Prisma.InterviewTypeUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<InterviewType | number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data,
      });
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return createdItem as any as InterviewType;
      }
      return createdItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async update(
    data: Prisma.InterviewTypeUncheckedUpdateInput,
    id: number,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<InterviewType | number | ErrorType> {
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
        return updatedItem as any as InterviewType;
      }
      return updatedItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async find(
    data: Prisma.InterviewTypeUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<InterviewType | number | null | ErrorType> {
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
        return foundItem as any as InterviewType;
      }
      return foundItem.id as number;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }

  async findObject(
    data: Prisma.InterviewTypeUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<InterviewType | null | ErrorType> {
    return (await this.find(data, true, endConnection)) as
      | InterviewType
      | null
      | ErrorType;
  }

  async findObjectId(
    data: Prisma.InterviewTypeUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.find(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }

  async createObject(
    data: Prisma.InterviewTypeUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<InterviewType | null | ErrorType> {
    return (await this.create(data, true, endConnection)) as
      | InterviewType
      | null
      | ErrorType;
  }

  async createObjectId(
    data: Prisma.InterviewTypeUncheckedCreateInput,
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
      | Prisma.InterviewTypeUncheckedCreateInput
      | Prisma.InterviewTypeUncheckedUpdateInput,
    endConnection: boolean,
  ): Promise<InterviewType | ErrorType> {
    const foundItem = await this.findObject(data, false);
    if (foundItem && foundItem['id']) {
      if (endConnection) {
        await this.disconnect();
      }
      return (await this.update(data, foundItem['id'], true, false)) as InterviewType;
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
