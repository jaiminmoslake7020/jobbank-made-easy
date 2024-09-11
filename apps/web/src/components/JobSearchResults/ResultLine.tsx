import React from 'react';
import {SearchQueryType} from '../../types/app';

export type ResultLineProps = {
    searchQuery: SearchQueryType | null
};

const ResultLine = (props: ResultLineProps) => {
    const {
        searchQuery
    } = props;
    return (searchQuery ? <h2>
        <span>Results for </span>
        <b>{searchQuery.search}</b>
        {
            searchQuery.location ? <span> at </span> : null
        }
        {
            searchQuery.location ? <b>{searchQuery.location}</b> : null
        }
        {
            searchQuery.isLmia ? <span> & includes <b>LMIA</b></span> : null
        }
    </h2> : <></>)
}

export default ResultLine;
