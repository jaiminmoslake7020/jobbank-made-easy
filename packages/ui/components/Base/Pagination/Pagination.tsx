import React from 'react';
import {Button} from '../Button/Button';
import './pagination.scss';
import {usePagination} from '../../../hooks';

export type PaginationPropsTypes = {
    maxItems: number
}

export const Pagination = (props: PaginationPropsTypes) => {
    const {
        maxItems
    } = props;
    const {
        page,
        setPageSize,
        nextPage,
        prevPage,
        pageSize
    } = usePagination();
    const numberOfPages = Math.ceil( maxItems / pageSize );
    const isItLastPage = maxItems <= ((page + 1) * pageSize);
    return (  numberOfPages > 1 ?
        <div className={"pagination-wrapper"}>
            <div className={"empty-space pagination-child"} ><strong>{page}</strong> of {numberOfPages}</div>
            <div className={"prev-next-wrapper pagination-child"}>
                <Button disabled={page === 1}  onClick={() => {
                    prevPage();
                }} >Prev</Button>
                <Button disabled={isItLastPage} onClick={() => {
                    nextPage()
                }} >Next</Button>
            </div>
            <div className={"page-size pagination-child"} >
                <select name={"pageSize"} value={pageSize} onChange={(e) => {
                    setPageSize(Number(e.target.value));
                }} >
                    <option value={"10"} >10</option>
                    <option value={"15"} >15</option>
                    <option value={"20"} >20</option>
                    <option value={"25"} >25</option>
                    <option value={"50"} >50</option>
                    <option value={"100"} >100</option>
                </select>
            </div>
        </div> : null
    );
}
