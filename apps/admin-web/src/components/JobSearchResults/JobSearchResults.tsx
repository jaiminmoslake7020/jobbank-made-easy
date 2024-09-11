import React from 'react';
import { useJobSearch} from '../JobSearch/useJobSearch';
import Results from './Results';
import ResultLine from './ResultLine';

const JobSearchResults = () => {
    const { query } = useJobSearch();
    const fetchResults = query ? query.search !== '' : false;
    return (
        <div className={"job-search-results-container"} >
            { fetchResults ? <Results searchQuery={query} /> : <ResultLine searchQuery={query}  /> }
        </div>
    );
}

export default JobSearchResults;
