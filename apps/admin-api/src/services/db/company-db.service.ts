import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { Prisma } from '.prisma/client';
import { PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';

export type CompanyDataType = {
  name: string;
  location: string;
  website?: string;
  number_of_operating_locations?: number;
  industry_id?: number;
  company_size_id?: number;
};

@Injectable()
export class CompanyDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }
  getTable(): Prisma.CompanyDelegate<any> {
    this.setTableName('company');
    return this._prisma.company;
  }
  async create(
    data: CompanyDataType,
    endConnection: boolean,
  ): Promise<number | ErrorType> {
    try {
      const createdItem = await this.getTable().create({
        data: data as any,
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
    data: CompanyDataType,
    endConnection: boolean,
  ): Promise<number | null | ErrorType> {
    try {
      let foundItem = null;
      let where = {
        name: data.name,
        location: data.location,
      } as {
        name: string;
        location: string;
        industry_id: number;
      };
      if (data.industry_id) {
        where = { ...where, industry_id: data.industry_id };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        foundItem = await this.getTable().findUnique({
          where: {
            name_location_industry_id: where,
          },
        });
      } else {
        foundItem = await this.getTable().findFirst({
          where: where as any,
        });
      }
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
    data: CompanyDataType,
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
