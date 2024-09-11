import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SearchConfigType, JobDetailsAllType } from 'types';
import { getAllJobDataBySearch } from '@prisma/client/sql';

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
      job_id: jobData.job_id,
    } as any;
  }
  async findAllJobs(
    searchConfig: SearchConfigType,
  ): Promise<JobDetailsAllType[]> {
    const { search, isLmia, location, page, limit } = searchConfig;
    const [address_locality, address_region] = (location || '')
      .split(',')
      .map((x) => x.trim());
    const jobData: getAllJobDataBySearch.Result[] =
      await this.getClient().$queryRawTyped(
        getAllJobDataBySearch(
          search,
          address_region,
          address_locality,
          isLmia,
          parseInt(String(page)) || 0,
          parseInt(String(limit)) || 10,
        ),
      );
    return jobData.map((d) => this.structureJobData(d));
  }
}
