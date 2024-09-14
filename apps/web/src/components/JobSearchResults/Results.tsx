import React from 'react';
import {useSearchJobsQuery} from '../../store/services/api';
import {Alert, ResultLine, Loading, JobItem, Pagination} from 'ui';

export type ResultsPropTypes = {
    searchString: string
};

const Results = (props: ResultsPropTypes) => {
    const {
        searchString
    } = props;

    // Call the hook with the userId parameter
    const { data, error, isLoading, isError, isFetching } = useSearchJobsQuery(`?${searchString}`);
    const jobCount = data && Array.isArray(data) && data.length > 0 ? data[0]['jobCount'] : 0;
    return (
        <>
            <ResultLine searchQuery={searchString} isLoading={isFetching} number={jobCount} />
            <div className={"results-wrapper"} >
                {
                    !isFetching && data && Array.isArray(data) && data.map((jobDetails, index) => {
                        const {
                            jobbank_link_id
                        } = jobDetails;
                        return <JobItem key={"JobResultItem-"+jobbank_link_id+"-"+index} jobLinkId={jobbank_link_id} jobDetails={{...jobDetails, query: true}} />
                    })
                }
                {
                    !isFetching && !isLoading && isError && error ? <Alert type={"error"} message={"There is some error loading jobs."} /> : ''
                }
                {
                    isFetching && <Loading />
                }
                {
                    !isFetching && data && Array.isArray(data) && <Pagination maxItems={jobCount} />
                }
            </div>
        </>
    );
}

export default Results;
