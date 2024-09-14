import React from 'react';
import { Button } from '../../../Base';
import './job-item-action.scss';

export type JobItemActionPropTypes = {
    jobLinkId: number,
    isLmia: boolean,
    fetchJobDetails?: Function
};

export const JobItemAction = (props: JobItemActionPropTypes) => {
    const {
        fetchJobDetails,
        jobLinkId,
        isLmia
    } = props;

    const jobLinkUrl = `https://www.jobbank.gc.ca/jobsearch/${isLmia ? 'jobpostingtfw' : 'jobposting'}/${jobLinkId}`;
    return <div className={" job-item-action-wrapper "}>
        <a className={" btn job-item-btn "} href={jobLinkUrl} target={"_blank"} >
            View Job Post
        </a>
        {
            fetchJobDetails && <Button className={" btn job-item-btn "}
                                       onClick={() => {
                                           fetchJobDetails();
                                       }}
          >
            Refresh
          </Button>
        }
    </div>
}

