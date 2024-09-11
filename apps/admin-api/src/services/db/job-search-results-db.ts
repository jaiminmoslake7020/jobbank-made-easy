import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

@Injectable()
export class JobSearchResultsDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }
  getTable(): Prisma.JobSearchResultsDelegate<any> {
    this.setTableName('jobSearchResults');
    return this._prisma.jobSearchResults;
  }
  async create(
    data: Prisma.JobSearchResultsUncheckedCreateInput,
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
    data: Prisma.JobSearchResultsJobbank_link_idIs_lmiaCompoundUniqueInput,
    endConnection: boolean,
  ): Promise<Prisma.JobSearchResultsGetPayload<any> | null | ErrorType> {
    try {
      let foundItem = await this.getTable().findUnique({
        where: {
          jobbank_link_id_is_lmia: {
            jobbank_link_id: data.jobbank_link_id,
            is_lmia: data.is_lmia,
          },
        },
      });
      if (data['job_id'] !== null && data.is_lmia && foundItem === null) {
        foundItem = await this.getTable().findUnique({
          where: {
            jobbank_link_id_is_lmia: {
              jobbank_link_id: data.jobbank_link_id,
              is_lmia: false,
            },
          },
        });
      }
      if (foundItem === null) {
        if (endConnection) {
          await this.disconnect();
        }
        return null;
      }
      if (endConnection) {
        await this.disconnect();
      }
      return foundItem;
    } catch (e) {
      return this.getError(this.context_search, e);
    }
  }
  async findOrCreate(
    data:
      | Prisma.JobSearchResultsUncheckedCreateInput
      | Prisma.JobSearchResultsUncheckedUpdateInput
      | Prisma.JobSearchResultsJobbank_link_idIs_lmiaCompoundUniqueInput,
    endConnection: boolean,
  ): Promise<number | ErrorType> {
    const foundItem = await this.find(
      data as Prisma.JobSearchResultsJobbank_link_idIs_lmiaCompoundUniqueInput,
      false,
    );
    if (foundItem && typeof foundItem['id'] === 'number') {
      if (endConnection) {
        await this.disconnect();
      }
      const foundItemCast = foundItem as Prisma.JobSearchResultsGetPayload<any>;
      const id = foundItemCast.id;
      if (typeof foundItemCast.job_id === 'number') {
        return id;
      }
      const searchId = foundItemCast.search_id;
      const newData = data as Prisma.JobSearchResultsUncheckedUpdateInput;
      if (!data['search_id']) {
        newData.search_id = searchId;
      }
      return await this.update(
        newData as Prisma.JobSearchResultsUncheckedUpdateInput,
        id,
        false,
      );
    } else {
      const createdItemId = await this.create(
        data as Prisma.JobSearchResultsUncheckedCreateInput,
        true,
      );
      if (typeof createdItemId === 'number') {
        return createdItemId;
      }
      return createdItemId;
    }
  }
  async update(
    data: Prisma.JobSearchResultsUncheckedUpdateInput,
    id: number,
    endConnection: boolean,
  ): Promise<number | ErrorType> {
    try {
      const updatedItem = await this.getTable().update({
        data: data,
        where: {
          id,
        },
      });
      const itemId = updatedItem.id;
      if (endConnection) {
        await this.disconnect();
      }
      return itemId;
    } catch (e) {
      return this.getError(this.context_update, e);
    }
  }
}
