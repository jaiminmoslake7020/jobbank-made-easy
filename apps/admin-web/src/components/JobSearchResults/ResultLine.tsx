import React from 'react';
import {SearchQueryType} from 'types';

export type ResultLineProps = {
    searchQuery: SearchQueryType | null,
    isLoading?: boolean,
    number?: number
};

const ResultLine = (props: ResultLineProps) => {
    const {
        searchQuery, isLoading, number
    } = props;
    return (searchQuery ? <h2>
        {
            !isLoading ? <span>There are <strong>{number}</strong> items found for </span> : <span>Searching results for </span>
        }
        <b>{searchQuery.search}</b>
        {
            searchQuery.location ? <>
                <span> at </span>
                <b>{searchQuery.location}</b>
            </> : null
        }
        {
            searchQuery.isLmia ? <span> & includes <b>LMIA</b></span> : null
        }
    </h2> : <></>)
}

export default ResultLine;
