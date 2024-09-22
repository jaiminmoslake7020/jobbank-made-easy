import React from "react";
import {
  JobDetailsAllType,
} from "types";
import {AdditionalQuestions, JobItemAction, JobLocation, RequiredItems, JobWage} from "../";
import { Alert } from "../../../Base";
import "./job-item.scss";

export type JobItemPropTypes = {
  jobDetails: JobDetailsAllType;
  jobLinkId: number;
  fetchJobDetails?: Function;
};

export const JobItem = (props: JobItemPropTypes) => {
  const { jobDetails, jobLinkId, fetchJobDetails } = props;

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
    is_lmia,
  } = jobDetails || {};

  return (
    <div className={"job-result-item-container"}>
      <div className={"job-result-item"}>
        {typeof job_id === "object" ? (
          <Alert message={job_id.message} type={"error"} />
        ) : (
          <>
            {query ? (
              <></>
            ) : (
              <Alert type={"success"} message={"New job Id: " + job_id} />
            )}
          </>
        )}
        <h3 className={"capitalize"}>{title}</h3>
        <p>Job Link Id: {jobLinkId}</p>
        <p>Company: {companyName}</p>
        <p>Email: {email}</p>
        <p>LMIA: {is_lmia ? "Yes" : "No"}</p>
        <p>jobSituation: {jobSituation}</p>
        <p>employmentType: {employmentType}</p>
        <RequiredItems requiredItems={requiredItems} />
        <AdditionalQuestions additionalQuestions={additionalQuestions} />
        <JobLocation jobLocation={jobLocation} />
        <JobWage wageObject={wageObject} />
        <p>job Posted On: {jobPostedOn}</p>
        <JobItemAction
          fetchJobDetails={fetchJobDetails}
          jobLinkId={jobLinkId}
          isLmia={is_lmia}
        />
      </div>
    </div>
  );
};
