import React from 'react';
import { useJobSearch} from '../../hooks/useJobSearch';
import Results from './Results';
import { ResultLine } from 'ui';
import JobSearchApp from '../JobSearch/JobSearchApp';

const JobSearchResults = () => {
    const { query, searchString } = useJobSearch();
    const fetchResults = query ? query.search !== '' : false;
    return (
        <div className={"job-search-results-container"} >
            <JobSearchApp />
            { fetchResults ? <Results searchString={searchString} /> : <ResultLine searchQuery={searchString} isLoading={true}  /> }
        </div>
    );
}

export default JobSearchResults;
