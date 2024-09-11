import { Injectable } from '@nestjs/common';
import Joi from 'joi';
import {
  coverLetter,
  noDate,
  noEmail,
  portfolio,
  transcript,
} from '../../constants/cheerio';
import { BaseCheerioService } from './base-cheerio.service';
import { ErrorType, HowToApplyResponseType } from 'types';
import { formatDateString2 } from '../../utils/formators/date';

@Injectable()
export class HowToApplyService extends BaseCheerioService {
  processHowToApplyAjaxResponse(
    data: string,
  ): HowToApplyResponseType | ErrorType {
    try {
      this.processCheerioLoad(data);
      const d = this.requiredItemsInEmail();
      return {
        email: this.getEmail(),
        lastDateToApply: this.getLastDateToApply(),
        ...d,
      };
    } catch (error) {
      console.error('Error fetching the webpage:', error);
      return { message: 'Please try again later.', error };
    }
  }
  requiredItemInEmail(liText: string): string | null {
    const liTextinLower = liText.toLowerCase();
    if (
      liTextinLower.indexOf(coverLetter[0]) !== -1 ||
      liTextinLower.indexOf(coverLetter[1]) !== -1 ||
      liTextinLower.indexOf(coverLetter[2]) !== -1
    ) {
      return coverLetter[0];
    } else if (liTextinLower.indexOf(transcript) !== -1) {
      return transcript;
    } else if (
      liTextinLower.indexOf(portfolio[0]) !== -1 ||
      liTextinLower.indexOf(portfolio[1]) !== -1
    ) {
      return portfolio[1];
    }
    return null;
  }
  requiredItemsInEmail(): {
    requiredItems: string[];
    additionalQuestions: string[];
  } {
    const itemsOfList = ['email'] as string[];
    const liTexts = [] as string[];
    const ul = this._cheerioApi('ul');
    if (ul) {
      ul.each((index1, ulItem) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._cheerioApi(ulItem)
          .find('li')
          .each((index, el) => {
            const elText = this._cheerioApi(el).text().trim();
            const preListItem = this.requiredItemInEmail(elText);
            if (preListItem === null) {
              if (
                elText.indexOf('You have successfully applied for this job') !==
                  -1 &&
                elText.indexOf('You have successfully withdrawn your') !== -1
              ) {
                liTexts.push(elText);
              }
            } else {
              itemsOfList.push(preListItem);
            }
          });
      });
    }
    return {
      requiredItems: itemsOfList,
      additionalQuestions: liTexts,
    };
  }
  getEmail(): string {
    let email = noEmail;
    this._cheerioApi('a').each((index, element) => {
      let aHref = this._cheerioApi(element).attr('href');
      if (aHref.indexOf('mailto:') !== -1) {
        aHref = aHref.replace('mailto:', '');
        email = aHref.trim();
      }
    });
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    // Validate the data against the schema
    const { error, value } = schema.validate({
      email,
    });
    if (error) {
      console.error('Validation error:', error.details);
      return noEmail;
    } else {
      return value.email;
    }
  }
  getLastDateToApply(): string {
    let date = noDate;
    this._cheerioApi('p[property="validThrough"]').each((index, pEl) => {
      date = this._cheerioApi(pEl).text().trim();
    });
    // Define a schema for the date validation
    const schema = Joi.object({
      date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
          'string.pattern.base': 'Date must be in the format YYYY-MM-DD.',
          'any.required': 'Date is required.',
        }),
    });
    // Validate the data against the schema
    const { error, value } = schema.validate({
      date,
    });
    if (error) {
      console.error('Validation error:', error.details);
      return noDate;
    } else {
      return formatDateString2(value.date);
    }
  }
}
