import { Injectable } from '@nestjs/common';
import { BaseCheerioService } from './base-cheerio.service';
import { ErrorType, WageObjectType } from 'types';
import { validateDateCustomFormat } from '../../utils/validators/date';
import { formatDateString } from '../../utils/formators/date';
import { JOB_NOT_FOUND, JOB_NOT_FOUND_STRING } from '../../constants/jobbank';
import { JobDetailsType, LocationObjectType } from 'types';
import {
  getAddressLocality,
  getAddressRegion,
} from '../../utils/formators/string';

export type JobNotFoundType = 'JOB_NOT_FOUND';

@Injectable()
export class JobDetailsService extends BaseCheerioService {
  validateLmia(data: string): boolean {
    this.processCheerioLoad(data);
    return this.isItLmia();
  }
  processData(data: string): JobDetailsType | JobNotFoundType | ErrorType {
    try {
      this.processCheerioLoad(data);
      const titleText = this._cheerioApi('title').text().trim();
      if (titleText === JOB_NOT_FOUND_STRING) {
        return JOB_NOT_FOUND;
      }
      const title = this.getJobTitle();
      const jobLocation = this.getJobLocation();
      const jobPostedOn = this.getJobPostedOn();
      const companyName = this.getCompanyName();
      const jobBankId = this.getJobBankId();
      const vacancies = this.getNumberOfVacancies();
      const wageObject = this.getWageObject();
      const employmentType = this.getEmploymentType();
      const jobSituation = this.getJobSituation();
      const is_lmia = this.isItLmia();
      return {
        title,
        jobLocation,
        jobPostedOn,
        companyName,
        jobBankId,
        vacancies,
        wageObject,
        employmentType,
        jobSituation,
        is_lmia
      };
    } catch (error) {
      console.error('Error fetching the webpage:', error);
      return { message: 'Please try again later.', error };
    }
  }
  getElementTextIfExists(identityString: string): string | undefined {
    const span = this._cheerioApi(identityString);
    if (span.length > 0) {
      const spans = this._cheerioApi(span).siblings('span');
      if (spans.length >= 2) {
        return this._cheerioApi(spans[1]).text().trim();
      }
    }
    return undefined;
  }
  getJobSituation(): string {
    const typesOfList = [
      'ul.job-posting-brief > li > span.fas.fa-building',
      'ul.job-posting-brief > li > span.fas.fa-laptop',
      'ul.job-posting-brief > li > span.fas.fa-briefcase',
      'ul.job-posting-brief > li > span.fas.fa-car-side',
    ];
    const workType = typesOfList
      .map((iS) => this.getElementTextIfExists(iS))
      .filter((s) => typeof s === 'string');
    if (workType.length > 0) {
      return workType[0];
    }
    return 'NOT_FOUND';
  }
  getJobTitle(): string {
    return this.findTextFromElement(`[property="name"][class="title"]`);
  }
  isItLmia(): boolean {
    return this._cheerioApi('.lmia-icon-pending').length >= 1;
  }
  getCompanyName(): string {
    return this.findTextFromElement(
      `span[property="hiringOrganization"] > span[property="name"]`,
    );
  }
  getJobBankId(): string {
    return this.findTextFromElement(
      `ul.job-posting-brief > li:last > span:nth-of-type(4)`,
    ).replace('#', '');
  }
  getEmploymentType(): string {
    return this.findTextFromElement(
      `ul.job-posting-brief > li > span[property="employmentType"]`,
    ).replace('employmentFull', 'employment Full');
  }
  getNumberOfVacancies(): number {
    const span = this._cheerioApi(
      'ul.job-posting-brief > li > span.fa.fa-user',
    ).siblings('span')[1];
    const vacancies = this._cheerioApi(span)
      .text()
      .replace('vacancies', '')
      .replace('vacancy', '')
      .trim();
    return !isNaN(Number(vacancies)) ? Number(vacancies) : 1;
  }
  getWageObject(): WageObjectType {
    const wageObject: WageObjectType = {};
    const span = this._cheerioApi(
      'ul.job-posting-brief > li > span.fa.fa-dollar',
    )
      .siblings('span[property="baseSalary"]')
      .children('span[typeof="QuantitativeValue"]')
      .find('span[property]');
    this._cheerioApi(span).each((index, el) => {
      const findEl = this._cheerioApi(el);
      let elProperty = findEl.attr('property');
      if (elProperty !== '' && elProperty !== null && elProperty) {
        elProperty = elProperty.trim();
        if (['minValue', 'maxValue'].includes(elProperty)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const v = findEl.text().trim().replaceAll(',', '');
          wageObject[elProperty] = Number(v);
        } else {
          wageObject[elProperty] = findEl.text().trim();
        }
      }
    });
    const workhoursEl = this._cheerioApi(
      'ul.job-posting-brief > li > span.fa.fa-dollar',
    )
      .siblings('span[property="baseSalary"]')
      .children('span[property="workHours"]');
    if (workhoursEl.length > 0) {
      const text = this._cheerioApi(workhoursEl).text().trim();
      wageObject['workHours'] = text
        .replace('hours per week', '')
        .replace(' to ', '-')
        .trim();
    }
    return wageObject;
  }
  getJobLocation(): LocationObjectType {
    const locationObject: LocationObjectType = {};
    const jobLocation = this._cheerioApi(
      `[property="joblocation"][typeof="Place"] > span[property="address"] > span`,
    );
    if (jobLocation.length > 0) {
      this._cheerioApi(
        `[property="joblocation"][typeof="Place"] > span[property="address"] > span`,
      ).each((index, el) => {
        const findEl = this._cheerioApi(el);
        let elProperty = findEl.attr('property');
        if (elProperty !== '' && elProperty !== null && elProperty) {
          elProperty = elProperty.trim();
          locationObject[elProperty] = findEl.text().trim();
        }
      });
      return locationObject;
    } else {
      const jobLocationCity = this._cheerioApi(
        `ul.job-posting-brief > li > span.fa-map-marker-alt`,
      ).siblings('span.city');
      if (jobLocationCity.length > 0) {
        const text = jobLocationCity.text().trim();
        const addressRegion = getAddressRegion(text);
        return {
          addressLocality: getAddressLocality(text, addressRegion),
          addressRegion,
        };
      }
    }
  }
  getJobPostedOn(): string {
    const jobPostedOn = this.findTextFromElement(
      `[property="datePosted"][class="date"]`,
    );
    if (typeof jobPostedOn === 'string') {
      const canBeADate = jobPostedOn.replace('Posted on', '').trim();
      const isDate = validateDateCustomFormat(canBeADate);
      if (isDate) {
        return formatDateString(isDate);
      }
      return null;
    }
    return null;
  }
}
