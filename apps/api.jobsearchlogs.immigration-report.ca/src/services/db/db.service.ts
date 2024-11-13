import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ErrorType } from '../../types';

export type ContextType = 'creating' | 'searching' | 'updating' | string;

@Injectable()
export class DbService {
  // Define a private field
  _prisma;
  _tableName;
  context_search = 'searching';
  context_create = 'creating';
  context_update = 'updating';
  initiateConnection() {
    this._prisma = new PrismaClient();
  }
  setTableName(tbaleName: string) {
    this._tableName = tbaleName;
  }
  getTableName(): string {
    return this._tableName;
  }
  getErrorMessage(context: ContextType): string {
    const tblName = this.getTableName();
    if (context === this.context_create) {
      return `There is some error while ${context} record in ${tblName}. Please try again later.`;
    } else if (context === this.context_update) {
      return `There is some error while ${context} record in ${tblName}. Please try again later.`;
    } else if (context === this.context_search) {
      return `There is some error while ${context} record from ${tblName}. Please try again later.`;
    } else {
      return `There is some error.  Please try again later.`;
    }
  }
  getError(context: ContextType, e: any): ErrorType {
    console.error('Error', this.getTableName(), e);
    return {
      message: this.getErrorMessage(context),
      error: e,
    };
  }
  async disconnect() {
    await this._prisma.$disconnect();
  }
  getConnection() {
    if (!this._prisma) {
      this._prisma = new PrismaClient();
    }
    return this._prisma;
  }
}
