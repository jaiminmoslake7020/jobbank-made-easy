import {JobDetailsAllType} from 'types';
import { Alert } from "ui";
import RequiredItems from './RequiredItems';
import AdditionalQuestions from './AdditionalQuestions';
import JobItemAction from './JobItemAction';
import React from 'react';

export type JobItemPropTypes = {
    jobDetails: JobDetailsAllType,
    jobLinkId: string,
    fetchJobDetails: Function
};


const JobItem = (props: JobItemPropTypes) => {
    const {
        jobDetails,
        jobLinkId,
        fetchJobDetails
    } = props;

    const {
        title,
        jobLocation,
        jobPostedOn,
        wageObject,
        companyName,
        job_id,
        email,
        requiredItems,
        additionalQuestions,
        jobSituation,
        employmentType,
        query,
        is_lmia
    } = jobDetails || {};

    return <div className={"job-result-item-container"}>
        <div className={"flex flex-col gap-2"}>
            {
                typeof job_id === 'object' ? <Alert  message={job_id.message} type={'error'} /> : <>
                    {
                        query ? <></> : <Alert type={"success"} message={"New job Id: "+job_id} />
                    }
                </>
            }
            <h3 className={"capitalize"}>{title}</h3>
            <p>Job Link Id: {jobLinkId}</p>
            <p>Company: {companyName}</p>
            <p>Email: {email}</p>
            <p>LMIA: {is_lmia ? 'Yes' : 'No'}</p>
            <p>jobSituation: {jobSituation}</p>
            <p>employmentType: {employmentType}</p>
            <RequiredItems requiredItems={requiredItems} />
            <AdditionalQuestions additionalQuestions={additionalQuestions} />
            <p className={"flex flex-col"}>
                <span>Job Location</span>
                {
                    jobLocation && Object.keys(jobLocation).map((property) => <span key={property} property={property}>{jobLocation[property]}</span>)
                }
            </p>
            <p className={"flex flex-row gap-2"}>
                <span>Wage</span>
                {
                    wageObject && Object.keys(wageObject).map((property) => <span key={property} property={property}>{wageObject[property]}</span>)
                }
            </p>
            <p>job Posted On: {jobPostedOn}</p>
            <JobItemAction fetchJobDetails={fetchJobDetails} jobLinkId={jobLinkId} isLmia={is_lmia} />
        </div>
    </div>;
}

export default JobItem;
