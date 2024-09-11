import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ErrorType } from 'types';

export type WebCrawlingReturnType = string | ErrorType;

@Injectable()
export class WebcrawlingService {
  async get(url): Promise<WebCrawlingReturnType> {
    try {
      // Fetch the HTML from the website
      const { data } = await axios.get(url);
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
      const { data } = await axios.post(howToApplyUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // Output the extracted titles
      return data;
    } catch (error) {
      console.error(error);
      return { message: 'Error fetching getHowToApplyAjaxData', error };
    }
  }
}
