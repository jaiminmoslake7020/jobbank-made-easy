import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ErrorType } from 'types';

export type WebCrawlingReturnType = string | ErrorType;

@Injectable()
export class WebcrawlingService {
  async get(url): Promise<WebCrawlingReturnType> {
    try {
      console.log('start', url);
      const t = new Date().getTime() / 1000;
      // Fetch the HTML from the website
      const { data } = await axios.get(url);
      const t1 = new Date().getTime() / 1000;
      console.log(url, t1 - t);
      return data;
    } catch (error) {
      console.error(error);
      return { message: `Error fetching get ${url}`, error };
    }
  }
  async getHowToApplyAjaxData(
    howToApplyUrl: string,
    jobId: number,
  ): Promise<WebCrawlingReturnType> {
    try {
      const formData = new URLSearchParams({
        'seekeractivity:jobid': String(jobId),
        seekeractivity_SUBMIT: '1',
        'jakarta.faces.ViewState': 'stateless',
        'jakarta.faces.behavior.event': 'action',
        action: 'applynowbutton',
        'jakarta.faces.partial.event': 'click',
        'jakarta.faces.source': 'seekeractivity',
        'jakarta.faces.partial.ajax': 'true',
        'jakarta.faces.partial.execute': 'jobid',
        'jakarta.faces.partial.render': 'applynow markappliedgroup',
        seekeractivity: 'seekeractivity',
      } as Record<string, string>);
      // Fetch the HTML from the website
      const t = new Date().getTime() / 1000;
      const { data } = await axios.post(howToApplyUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const t1 = new Date().getTime() / 1000;
      console.log('howToApplyUrl', howToApplyUrl, t1 - t);
      // Output the extracted titles
      return data;
    } catch (error) {
      console.error(error);
      return { message: 'Error fetching getHowToApplyAjaxData', error };
    }
  }
}
