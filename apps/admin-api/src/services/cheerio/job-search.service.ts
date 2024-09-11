import { Injectable } from '@nestjs/common';
import { BaseCheerioService } from './base-cheerio.service';
import { SearchJobType } from 'types';

@Injectable()
export class JobSearchService extends BaseCheerioService {
  searchJobs(data: string): {
    jobs: SearchJobType[];
    hasMoreJobs: boolean;
  } {
    const jobsList: SearchJobType[] = [];
    this.processCheerioLoad(data);
    const hasMoreJobs = this._cheerioApi('#moreresultbutton').length === 1;
    this._cheerioApi('a.resultJobItem').each((index, element) => {
      const linkUrl = this._cheerioApi(element).attr('href');
      const isPostedOnJobBank =
        this._cheerioApi(element).find('span.postedonJB').length === 1;
      if (linkUrl.indexOf('jobsearch') !== -1 && isPostedOnJobBank) {
        let replaceTerm = 'jobsearch/jobposting/';
        let isLmia = false;
        if (linkUrl.indexOf('jobpostingtfw') !== -1) {
          replaceTerm = 'jobsearch/jobpostingtfw/';
          isLmia = true;
        }
        const jobId = linkUrl
          .replace(replaceTerm, '')
          .replace('?source=searchresults', '')
          .split(';jsessionid')[0]
          ?.replace('/', '');
        jobsList.push({
          jobLinkId: jobId,
          isLmia,
        });
      }
    });
    return {
      jobs: jobsList,
      hasMoreJobs
    };
  }
}
