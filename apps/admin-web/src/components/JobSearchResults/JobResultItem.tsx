import React, { useCallback, useEffect, useState } from "react";
import {
  useGetJobDetailsQuery,
  useLazyGetJobDetailsQuery,
} from "../../store/services/api";
import { JobDetailsAllType } from "types/dist";
import { Loading, Alert, JobItemAction, JobItem } from "ui";

export type JobResultItemPropTypes = {
  jobLinkId: number;
  isLmia: boolean;
  processed: Function;
};

const JobResultItem = (props: JobResultItemPropTypes) => {
  const { jobLinkId, isLmia, processed } = props;

  const jobInfo = `?id=${jobLinkId}&isLmia=${isLmia}`;
  const { data, error, isLoading, isFetching, refetch } = useGetJobDetailsQuery(jobInfo);
  const [
    trigger,
    {
      data: lazydata,
      error: lazyError,
      isFetching: lazyIsFetching,
      isLoading: lazyIsLoading,
    },
  ] = useLazyGetJobDetailsQuery();

  const [jobDetails, setJobDetails] = useState<JobDetailsAllType | null>(null);
  const loading = isFetching || lazyIsFetching;
  const errorState = error || lazyError;

  useEffect(() => {
    setJobDetails(data);
  }, [data]);

  useEffect(() => {
    setJobDetails(lazydata);
  }, [lazydata]);

  // Use useCallback to memoize the fetchJobDetails function
  const fetchJobDetails = useCallback(
    () => {
      refetch();
    },
    [refetch], // Depend on the trigger function from useLazyGetJobDetailsQuery
  );

  useEffect(() => {
    const mount = () => {
      if (!isFetching) {
        processed();
      }
    };
    return mount();
  }, [isFetching, processed]);

  if (loading) {
    return <Loading />;
  }

  if (errorState) {
    return (
      <div className={"job-result-item-container"}>
        <Alert type={"error"} message={"job Not found"} />
        <JobItemAction
          fetchJobDetails={fetchJobDetails}
          jobLinkId={jobLinkId}
          isLmia={isLmia}
        />
      </div>
    );
  }

    if (jobDetails) {
        return (
            <JobItem
                jobLinkId={jobLinkId}
                jobDetails={jobDetails}
                fetchJobDetails={fetchJobDetails}
            />
        );
    }

  return <Alert type={"error"} message={"There is some problem occurred."} />;
};

export default React.memo(JobResultItem);
