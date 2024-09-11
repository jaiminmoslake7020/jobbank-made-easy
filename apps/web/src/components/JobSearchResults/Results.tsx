import React from 'react';
import {SearchQueryType} from '../../types/app';
import {useSearchJobsQuery} from '../../store/services/api';
import JobResultItem from './JobResultItem';

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
    // const { data: posts, error, isLoading } = useSearchJobsQuery(searchString);
    const data = [{"jobLinkId":"41326350","isLmia":true},{"jobLinkId":"41063814","isLmia":true}];

    return (
        <div className={"results-wrapper"} >{
            data.map(({jobLinkId, isLmia}, index) => <JobResultItem key={Number(jobLinkId)} jobLinkId={jobLinkId} isLmia={isLmia} />)
        }</div>
    );
}

export default Results;
