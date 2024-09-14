import React from 'react';

export type ResultLineProps = {
    searchQuery: string | null,
    isLoading?: boolean,
    number?: number
};

export const ResultLine = (props: ResultLineProps) => {
    const {
        searchQuery, isLoading, number
    } = props;

    let params = null ;
    if (searchQuery) {
        params = new URLSearchParams(searchQuery);
    }

    return (params ? <h2>
        {
            !isLoading ? <span>There are <strong>{number}</strong> items found for </span> : <span>Searching results for </span>
        }
        <b>{params.get('search')}</b>
        {
            params.get('location') ? <>
                <span> at </span>
                <b>{params.get('location')}</b>
            </> : null
        }
        {
            params.get('isLmia') ? <span> & includes <b>LMIA</b></span> : null
        }
    </h2> : <></>)
}

