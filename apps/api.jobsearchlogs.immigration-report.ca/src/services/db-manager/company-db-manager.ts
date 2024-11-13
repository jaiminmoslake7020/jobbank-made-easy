import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AddressDbService, CompanyDbService } from '../db';
import { ErrorType } from '../../types';

@Injectable()
export class CompanyDbManager {
  constructor(
    private companyDbService: CompanyDbService,
    private addressDbService: AddressDbService,
  ) {}
  _client: PrismaClient<any>;
  initiateConnection() {
    this._client = new PrismaClient();
  }
  getClient() {
    return this._client;
  }
  async disconnect() {
    await this._client.$disconnect();
  }
  async insertCompany(data: any): Promise<number | ErrorType | null> {
    const { address, ...company } = data;
    try {
      this.addressDbService.setClient(this.getClient());
      const newAddress = await this.addressDbService.createObjectId(
        {
          streetAddress: address.street_number + ' ' + address.street_name,
          apartmentNumber: '',
          city: address.city,
          zipcode: address.zipcode,
          province: address.province,
          country: address.country,
        },
        false,
      );
      if (typeof newAddress === 'number') {
        company.addressId = newAddress;
      }
      this.companyDbService.setClient(this.getClient());
      const newCompanyId = await this.companyDbService.createObjectId(
        company,
        false,
      );
      if (typeof newCompanyId === 'number') {
        return newCompanyId;
      }

      return {
        message: 'Error while inserting job details',
        error: null,
      };
    } catch (e) {
      return {
        message: 'Error while inserting job details',
        error: e,
      };
    }
  }
  async findAll(userId: number): Promise<any | null> {
    this.companyDbService.setClient(this.getClient());
    const query = `select id, name from public."Company" where "userId" = $1 ;`;
    const companies = await this.getClient().$queryRawUnsafe(query, userId);
    console.log('companies', companies);
    return companies;
  }
}
