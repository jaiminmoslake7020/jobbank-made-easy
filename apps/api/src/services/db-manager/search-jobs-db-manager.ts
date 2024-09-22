import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SearchConfigType, JobDetailsAllType } from '../../types';
import {
  getAllJobDataBySearch,
  getSearchKeysData,
  getCountAllJobDataBySearch,
} from '@prisma/client/sql';

@Injectable()
export class SearchJobsDbManager {
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
  structureJobData(jobData: getAllJobDataBySearch.Result) {
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
      jobPostedOn: jobData.jobpostedon.toLocaleDateString(),
      companyName: jobData.companyname,
      jobBankId: String(jobData.jobbankid),
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
      job_id: jobData.job_id,
      jobbank_link_id: jobData.jobbank_link_id,
      jobLinkUrl: 'fwefwe',
      is_lmia: jobData.is_lmia,
    } as JobDetailsAllType;
  }
  async findAllJobs(
    searchConfig: SearchConfigType,
  ): Promise<JobDetailsAllType[]> {
    const { search, isLmia, location, page, limit } = searchConfig;
    // eslint-disable-next-line prefer-const
    let [address_locality, address_region] = (location || '')
      .split(',')
      .map((x) => (x || '').toLowerCase().trim());
    if (!address_region && address_locality === '') {
      address_locality = '';
      address_region = '';
    }
    const typedSql = getAllJobDataBySearch(
      search,
      address_region,
      address_locality,
      isLmia,
      page * limit,
      limit,
    );
    console.log('typedSql', typedSql.values);
    const jobData: getAllJobDataBySearch.Result[] =
      await this.getClient().$queryRawTyped(typedSql);

    const typedCountSql = getCountAllJobDataBySearch(
      search,
      address_region,
      address_locality,
      isLmia,
    );
    const jobCount: getCountAllJobDataBySearch.Result[] =
      await this.getClient().$queryRawTyped(typedCountSql);

    return jobData.map((d) => ({
      ...this.structureJobData(d),
      jobCount: Number(jobCount[0].count),
    }));
  }
  async findSearchKeys(): Promise<string[]> {
    const s = getSearchKeysData();
    const searchResults = await this.getClient().$queryRawTyped(s);
    return searchResults.map((s) => s.search);
  }
}
