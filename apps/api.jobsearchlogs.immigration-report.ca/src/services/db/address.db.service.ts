import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { Address, PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class AddressDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }

  getTable(): Prisma.AddressDelegate<any> {
    this.setTableName('address');
    return this._prisma.Address;
  }

  async create(
    data: Prisma.AddressUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<Address | number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data,
      });
      if (endConnection) {
        await this.disconnect();
      }
      if (returnObject) {
        return createdItem as any as Address;
      }
      return createdItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async update(
    data: Prisma.AddressUncheckedUpdateInput,
    id: number,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<Address | number | ErrorType> {
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
        return updatedItem as any as Address;
      }
      return updatedItem.id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }

  async find(
    data: Prisma.AddressUncheckedCreateInput,
    returnObject: boolean,
    endConnection: boolean,
  ): Promise<Address | number | null | ErrorType> {
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
        return foundItem as any as Address;
      }
      return foundItem.id as number;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }

  async findObject(
    data: Prisma.AddressUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<Address | null | ErrorType> {
    return (await this.find(data, true, endConnection)) as
      | Address
      | null
      | ErrorType;
  }

  async findObjectId(
    data: Prisma.AddressUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    return (await this.find(data, false, endConnection)) as
      | number
      | null
      | ErrorType;
  }

  async createObject(
    data: Prisma.AddressUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<Address | null | ErrorType> {
    return (await this.create(data, true, endConnection)) as
      | Address
      | null
      | ErrorType;
  }

  async createObjectId(
    data: Prisma.AddressUncheckedCreateInput,
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
      | Prisma.AddressUncheckedCreateInput
      | Prisma.AddressUncheckedUpdateInput,
    endConnection: boolean,
  ): Promise<Address | ErrorType> {
    const foundItem = await this.findObject(data, false);
    if (foundItem && foundItem['id']) {
      if (endConnection) {
        await this.disconnect();
      }
      return (await this.update(data, foundItem['id'], true, false)) as Address;
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
