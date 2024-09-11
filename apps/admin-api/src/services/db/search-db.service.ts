import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { PrismaClient } from '@prisma/client';
import { ErrorType } from 'types';
import { Prisma } from '.prisma/client';

export type SearchDataType = {
  search_string: string;
  location_string: string;
  filter_string: string;
  sort_string: string;
  results: string;
};

@Injectable()
export class SearchDbService extends DbService {
  setClient(c: PrismaClient<any>) {
    this._prisma = c;
  }
  getTable(): Prisma.SearchDelegate<any> {
    this.setTableName('search');
    return this._prisma.search;
  }
  async create(
    searchData: Prisma.SearchUncheckedCreateInput,
    endConnection: boolean,
  ): Promise<number | ErrorType> {
    try {
      const oneSearch = await this.getTable().create({
        data: searchData,
      });
      const id = oneSearch.id;
      if (endConnection) {
        await this.disconnect();
      }
      return id;
    } catch (e) {
      return this.getError(this.context_create, e);
    }
  }
}
