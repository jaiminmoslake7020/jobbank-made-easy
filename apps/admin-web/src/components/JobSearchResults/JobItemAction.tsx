import React from 'react';

export type JobItemActionPropTypes = {
    jobLinkId: string,
    isLmia: boolean,
    fetchJobDetails?: Function
};

const JobItemAction = (props: JobItemActionPropTypes) => {
    const {
        fetchJobDetails,
        jobLinkId,
        isLmia
    } = props;

    const jobLinkUrl = `https://www.jobbank.gc.ca/jobsearch/${isLmia ? 'jobpostingtfw' : 'jobposting'}/${jobLinkId}`;
    return <div className={"flex flex-row gap-4 "}>
        <a className={"btn w-fit text-sm px-2 py-2 cursor-pointer "} href={jobLinkUrl} target={"_blank"} >
            View Job Post
        </a>
        {
            fetchJobDetails && <button className={"btn w-fit text-sm px-2 py-2 cursor-pointer "}
                                       onClick={() => {
                                           fetchJobDetails();
                                       }}
          >
            Refresh
          </button>
        }
    </div>
}

export default JobItemAction;
