import React, {useState} from 'react';
import {SearchQueryType} from '../../types/app';
import {useSearchJobsQuery} from '../../store/services/api';
import JobResultItem from './JobResultItem';
import {Alert, ResultLine, Loading} from 'ui';

export type ResultsPropTypes = {
    searchQuery: SearchQueryType
};

const Results = (props: ResultsPropTypes) => {
    const {
        searchQuery
    } = props
    const {
        search, location, isLmia
    } = searchQuery;
    const searchString = `?search=${search}&location=${location}${isLmia  ? '&isLmia=true' : '&isLmia=' }`

    // Call the hook with the userId parameter
    const { data, error, isLoading, isError, isFetching } = useSearchJobsQuery(searchString);
    let {
        jobs
    } = data || {};

    const [processedQueue, setProcessedQueue] = useState<number[]>([]);
    const sortedArray = processedQueue.sort((a, b) => b - a);
    const findMin = sortedArray.length === 0 ? 0 : sortedArray[0];

    return (
        <>
            <ResultLine searchQuery={searchQuery} isLoading={isFetching} number={(jobs || []).length} />
            <div className={"results-wrapper"} >
                {
                    !isFetching && Array.isArray(jobs) && jobs.map(({jobLinkId, isLmia}, index) => {
                        if (index > findMin + 2) {
                            return <Loading key={"Loading-"+jobLinkId} />;
                        }
                        return <JobResultItem key={"JobResultItem-"+jobLinkId+"-"+index} jobLinkId={Number(jobLinkId)} isLmia={isLmia} processed={() => {
                            if (!processedQueue.includes(index)) {
                                setProcessedQueue((prev) => [...prev, index]);
                            }
                    }} />
                    })
                }
                {
                    !isFetching && !isLoading && isError && error ? <Alert type={"error"} message={"There is some error loading jobs."} /> : ''
                }
                {
                    isFetching && <Loading />
                }
            </div>
        </>
    );
}

export default Results;
