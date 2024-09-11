import { Injectable } from '@nestjs/common';
import { BaseCheerioService } from './base-cheerio.service';
import { CompanyDetailsType, ErrorType } from 'types';
import { replaceAll } from '../../utils/formators/string';

@Injectable()
export class CompanyDetailsService extends BaseCheerioService {
  processData(data: string): CompanyDetailsType | ErrorType {
    try {
      this.processCheerioLoad(data);
      const companyName = this.getCompanyName();
      const companyWebsite = this.getCompanyWebsite();
      const industryName = this.getIndustryName();
      const companyType = this.getCompanyType();
      const numberOfLocations = this.getNumberOfLocations();
      return {
        companyName,
        companyWebsite,
        industryName,
        companyType,
        numberOfLocations,
      };
    } catch (error) {
      console.error('Error fetching the webpage:', error);
      return { message: 'Please try again later.', error };
    }
  }
  getCompanyName(): string {
    return this.findTextFromElement(
      `span[property="hiringOrganization"] > span[property="name"]`,
    );
  }
  getCompanyWebsite(): string | undefined {
    const aLink = this._cheerioApi(
      'span[property="hiringOrganization"] > span[property="name"] > a',
    );
    if (aLink.length > 0) {
      return aLink.attr('href');
    }
    return undefined;
  }
  getIndustryName(): string | undefined {
    const el = this._cheerioApi('div.job-posting-details-employer-wrapper')
      .find('li:first')
      .find('span.details');
    if (el.length > 0) {
      return el.text().trim();
    }
    return undefined;
  }
  getCompanyType(): string | undefined {
    const el = this._cheerioApi('div.job-posting-details-employer-wrapper')
      .find('span.fas.fa-user')
      .siblings('span.details');
    if (el.length > 0) {
      return replaceAll(replaceAll(String(el.text()), `\t`), `\n`).trim();
    }
    return undefined;
  }
  getNumberOfLocations(): number | undefined {
    const el = this._cheerioApi('div.job-posting-details-employer-wrapper')
      .find('span.fas.fa-map-marker-alt')
      .siblings('span.details');
    if (el.length > 0) {
      const isNumberCheck = replaceAll(
        replaceAll(String(el.text()), `\t`),
        `\n`,
      )
        .replace('business location', '')
        .trim();
      if (!isNaN(Number(isNumberCheck))) {
        return Number(isNumberCheck);
      }
      return undefined;
    }
    return undefined;
  }
}
