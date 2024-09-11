import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';

@Injectable()
export class BaseCheerioService {
  // Define a private field
  _cheerioApi: CheerioAPI;
  processCheerioLoad(data: string) {
    this._cheerioApi = cheerio.load(data);
  }
  findTextFromElement(elementIdString: string): string {
    const titleElement = this._cheerioApi(elementIdString);
    if (titleElement) {
      return (titleElement.text() || '').trim();
    }
    throw new Error(elementIdString + ' not found');
  }
}
