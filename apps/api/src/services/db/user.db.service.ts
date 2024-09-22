import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { PrismaClient, User } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class UserDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }
  getTable(): Prisma.UserDelegate<any> {
    this.setTableName('user');
    return this._prisma.user;
  }
  async create(
    data: Prisma.UserUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<User | number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data,
      });
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return createdItem as any as User;
      }
      return createdItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }
  async update(
    data: Prisma.UserUncheckedUpdateInput,
    id: number,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<User | number | ErrorType> {
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
        return updatedItem as any as User;
      }
      return updatedItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }
  async find(
    data: Prisma.UserUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<User | number | null | ErrorType> {
    try {
      const foundItem = await this.getTable().findUnique({
        where: {
          email: data.email,
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
        return foundItem as any as User;
      }
      return foundItem.id as number;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }
  async findObject(
    data: Prisma.UserUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<User | null | ErrorType> {
    return (await this.find(data, true, endConnection)) as
      | User
      | null
      | ErrorType;
  }
  async findObjectId(
    data: Prisma.UserUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.find(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }
  async createObject(
    data: Prisma.UserUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<User | null | ErrorType> {
    return (await this.create(data, true, endConnection)) as
      | User
      | null
      | ErrorType;
  }
  async createObjectId(
    data: Prisma.UserUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.create(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }
  async findOrCreate(
    data: Prisma.UserUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<User | ErrorType> {
    const foundItem = await this.findObject(data, false);
    if (foundItem && foundItem['id']) {
      if (endConnection) {
        await this.disconnect();
      }
      return (await this.update(data, foundItem['id'], true, false)) as User;
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
  async findFirst(
    token: string,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<User | number | null | ErrorType> {
    try {
      const foundItem = await this.getTable().findFirst({
        where: {
          auth_token: token,
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
        return foundItem as any as User;
      }
      return foundItem.id as number;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }
}
