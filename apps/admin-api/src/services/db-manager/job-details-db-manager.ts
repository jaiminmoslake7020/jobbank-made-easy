import { Injectable } from '@nestjs/common';
import {
  CompanyDbService,
  CompanySizeDbService,
  DbService,
  IndustryDbService,
  JobDbService,
  JobSearchResultsDbService,
  RequiredItemDbService,
  SearchDbService,
  WageUnitDbService,
} from '../db';
import { getLocationString } from '../../utils/formators/string';
import { ErrorType, JobDetailsAllType, SearchJobType } from 'types';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '.prisma/client';
import { lmiaConst, lmiaValue } from '../../constants/jobbank';
import { getJobData, getSearchKeysData } from '@prisma/client/sql';

@Injectable()
export class JobDetailsDbManagerService {
  constructor(
    private dbService: DbService,
    private wageUnitDbService: WageUnitDbService,
    private industryDbService: IndustryDbService,
    private companyDbService: CompanyDbService,
    private companySizeDbService: CompanySizeDbService,
    private jobDbService: JobDbService,
    private requiredItemDbService: RequiredItemDbService,
    private searchDbService: SearchDbService,
    private jobSearchResultsDbService: JobSearchResultsDbService,
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
  async insertJobDetails(
    data: JobDetailsAllType,
  ): Promise<number | ErrorType | null> {
    try {
      const {
        jobLocation,
        companyData,
        wageObject,
        requiredItems,
        jobbank_link_id,
        jobBankId,
        jobPostedOn,
        is_lmia,
        title,
        vacancies,
        employmentType,
        jobSituation,
        email,
        lastDateToApply,
        additionalQuestions,
      } = data;
      const {
        industryName,
        companyName,
        companyWebsite,
        companyType,
        numberOfLocations,
      } = companyData;
      const { unitText } = wageObject;
      const locationString = getLocationString(jobLocation);

      let industry_id = null;
      let wage_id = null;
      let company_size_id = null;
      let company_id = null;
      let job_id = null;
      const client = this.getClient();
      const required_item_id_array = await this.processItems(
        requiredItems,
        client,
      );
      if (industryName) {
        this.industryDbService.setClient(client);
        const industryResult = await this.industryDbService.findOrCreate(
          {
            name: industryName,
          },
          false,
        );
        if (typeof industryResult === 'number') {
          industry_id = industryResult;
        }
      }
      if (unitText) {
        this.wageUnitDbService.setClient(client);
        const wageResult = await this.wageUnitDbService.findOrCreate(
          {
            name: unitText,
          },
          false,
        );
        if (typeof wageResult === 'number') {
          wage_id = wageResult;
        }
      }
      const companyTypeArray = (companyType || '')
        .split('business ')
        .map((e) => e.trim());
      if (companyTypeArray.length === 2) {
        this.companySizeDbService.setClient(client);
        const companySizeResult = await this.companySizeDbService.findOrCreate(
          {
            name: companyTypeArray[0] as string,
            description: companyTypeArray[1] as string,
          },
          false,
        );
        if (typeof companySizeResult === 'number') {
          company_size_id = companySizeResult;
        }
      }
      this.companyDbService.setClient(client);
      company_id = await this.companyDbService.findOrCreate(
        {
          name: companyName,
          location: locationString,
          website: companyWebsite,
          industry_id: industry_id,
          company_size_id: company_size_id,
          number_of_operating_locations: numberOfLocations,
        },
        true,
      );
      if (typeof company_id === 'number') {
        this.jobDbService.setClient(client);
        let JobRequiredItem: Prisma.JobRequiredItemCreateNestedManyWithoutJobInput =
          undefined;
        if (required_item_id_array.length > 0) {
          const itemsArray = [];
          required_item_id_array.forEach((x) => {
            if (typeof x === 'number') {
              itemsArray.push({
                required_item_id: x,
              });
            }
          });
          if (itemsArray.length > 0) {
            JobRequiredItem = {
              createMany: {
                data: itemsArray,
              },
            };
          }
        }

        let JobAdditionalQuestions = undefined;
        if (
          additionalQuestions &&
          Array.isArray(additionalQuestions) &&
          additionalQuestions.length > 0
        ) {
          JobAdditionalQuestions = {
            createMany: {
              data: additionalQuestions.map((q) => ({ question: q })),
            },
          };
        }

        job_id = await this.jobDbService.findOrCreate(
          {
            jobbank_link_id: Number(jobbank_link_id),
            jobbank_id: Number(jobBankId),
            posted_on: new Date(jobPostedOn),
            last_date_to_apply: new Date(lastDateToApply),
            title: title,
            number_of_vacancies: vacancies,
            location: locationString,
            work_type_situation: jobSituation,
            is_lmia: is_lmia,
            how_to_apply_email: email,
            company_id: company_id,
            street_address: jobLocation.streetAddress,
            address_locality: jobLocation.addressLocality,
            address_region: jobLocation.addressRegion,
            postal_code: jobLocation.postalCode,
            employment_type: employmentType,
            published: true,
            JobWage: {
              create: {
                min_value: wageObject.minValue,
                max_value: wageObject.maxValue,
                unit_text: wageObject.unitText,
                work_hours: wageObject.workHours,
                wage_id: wage_id,
              },
            },
            JobRequiredItem,
            JobAdditionalQuestions,
          } as Prisma.JobUncheckedCreateInput,
          false,
        );
      }
      return job_id;
    } catch (e) {
      return {
        message: 'Error while inserting job details',
        error: e,
      };
    }
  }
  async processItems(
    items: string[],
    client: PrismaClient<any>,
  ): Promise<Awaited<number | { message: string }>[]> {
    this.requiredItemDbService.setClient(client);
    const promises = items.map(async (item) => {
      return await this.requiredItemDbService.findOrCreate(
        {
          name: item,
        },
        false,
      );
    });
    return Promise.all(promises);
  }
  async insertSearchDetails(searchConfig) {
    this.searchDbService.setClient(this.getClient());
    return await this.searchDbService.create(
      {
        search_string: searchConfig.search,
        location_string: searchConfig.location,
        filter_string: searchConfig.isLmia ? `${lmiaConst}=${lmiaValue}` : '',
        sort_string: 'M',
      },
      true,
    );
  }
  async attachJobLinksToSearch(
    searchJobLinks: SearchJobType[],
    searchId: number,
  ): Promise<SearchJobType[]> {
    const promises = searchJobLinks.map(async ({ jobLinkId, isLmia }) => {
      this.jobSearchResultsDbService.setClient(this.getClient());
      const jobSearchResultId =
        await this.jobSearchResultsDbService.findOrCreate(
          {
            jobbank_link_id: Number(jobLinkId),
            is_lmia: isLmia,
            search_id: searchId,
          },
          false,
        );
      return { jobLinkId, isLmia, jobSearchResultId } as SearchJobType;
    });
    return Promise.all(promises);
  }
  async findJobByJobLinkId(
    jobLinkId: number,
    isLmia: boolean,
  ): Promise<number | ErrorType | null> {
    this.jobDbService.setClient(this.getClient());
    return await this.jobDbService.find(
      {
        jobbank_link_id: Number(jobLinkId),
        is_lmia: isLmia,
      },
      false,
    );
  }
  async findSearchKeys(): Promise<string[]> {
    const searchResults =
      await this.getClient().$queryRawTyped(getSearchKeysData());
    return searchResults.map((s) => s.search);
  }
  async findJobData(jobId: number) {
    const [jobData] = await this.getClient().$queryRawTyped(getJobData(jobId));
    if (jobData) {
      let rQs = (jobData.requireditems || '').split('===');
      let aQs = (jobData.additionalquestions || '').split('===');
      if (aQs.length === 1 && aQs[0] === '') {
        aQs = [];
      }
      if (rQs.length === 1 && rQs[0] === '') {
        rQs = [];
      }
      return {
        title: jobData.title,
        jobLocation: {
          streetAddress: jobData.streetaddress,
          addressLocality: jobData.addresslocality,
          addressRegion: jobData.addressregion,
          postalCode: jobData.postalcode,
        },
        jobPostedOn: jobData.jobpostedon,
        companyName: jobData.companyname,
        jobBankId: jobData.jobbankid,
        vacancies: jobData.vacancies,
        wageObject: {
          currency: '$',
          minValue: jobData.minvalue,
          unitText: jobData.unittext,
          workHours: jobData.workhours,
          maxValue: jobData.maxvalue,
        },
        companyData: {
          companyName: jobData.companyname,
          companyWebsite: jobData.companywebsite,
          industryName: jobData.industryname,
          companyType: jobData.companytype,
          numberOfLocations: jobData.numberoflocations,
        },
        employmentType: jobData.employmenttype,
        jobSituation: jobData.jobsituation,
        email: jobData.email,
        lastDateToApply: jobData.lastdatetoapply,
        requiredItems: rQs,
        additionalQuestions: aQs,
        job_id: jobId,
      } as any;
    }
    return null;
  }
  async attachJobToSearch(jobLinkId, isLmia, jobId) {
    return await this.jobSearchResultsDbService.findOrCreate(
      {
        jobbank_link_id: jobLinkId,
        is_lmia: isLmia,
        job_id: jobId,
      },
      false,
    );
  }
}
