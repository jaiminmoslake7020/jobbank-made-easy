import React, {useEffect} from 'react';
import {useJobSearch} from './../JobSearch/useJobSearch';
import ResultLine from './ResultLine';
import Results from './Results';

const JobSearchResults = () => {
    const { query } = useJobSearch();
    const fetchResults = query ? (query.search !== '' || query.location !== '') : false;
    return (
        <div className={"job-search-results-container"} >
            <ResultLine searchQuery={query} />
            { fetchResults ? <Results searchQuery={query} /> : null }
        </div>
    );
}

export default JobSearchResults;
