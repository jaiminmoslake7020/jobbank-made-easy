import React, { useCallback, useEffect, useState} from 'react';
import {AutoCompleteItemProp, Loading} from 'ui';
import {getJobSearch} from '../../hooks/useJobSearch';
import { JobSearch } from "ui";
import {useRouter} from 'next/router';
import {SearchQueryType} from '../../types/app';
import {apiFreeze, useGetSearchKeysQuery} from '../../store/services/api';
import {
    cities
} from 'common/dist/index';

let cityList = [] as AutoCompleteItemProp[];
Object.keys(cities).forEach((p:string) => {
    const citiesInThisProvince = cities[p];
    cityList = [
        ...cityList, ...(citiesInThisProvince.map((c) => ({label: `${c}, ${p}`,
            value: `${c}, ${p}`})))
    ];
});

const JobSearchApp = () => {
    const router = useRouter();
    const [searchForm, setSearchForm] = useState<SearchQueryType>({
        search: '',
        location: '',
        isLmia: false
    });
    const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

    const { data, error, isLoading, isError, isFetching } = useGetSearchKeysQuery('');

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const searchString = searchForm.search;
        const locationString = searchForm.location;
        let queryParams = searchString ? `search=${searchString}` : 'search=';
        queryParams += locationString ? `&location=${locationString}` : '&location=';
        queryParams += searchForm.isLmia ? `&isLmia=${searchForm.isLmia}` : '&isLmia=';
        if (searchString !== '' ||  locationString !== '') {
            setDisabledBtn(true);
            setTimeout(() => {
                setDisabledBtn(false);
            }, apiFreeze.searchJobs);
            router.push(`/results?${queryParams}`);
        }
    }, [router, searchForm])

    useEffect(() => {
        const mount = () => {
            const query = getJobSearch();
            setSearchForm(query);
        };
        return mount();
    }, [])

    const x = (data || []).map((d) => ({label:d, value:d}));

    return (
    !isFetching ?
        <JobSearch searchForm={searchForm} setSearchForm={setSearchForm} onSubmit={onSubmit} disabledBtn={disabledBtn} cityList={cityList} jobSearchKeywords={x} />
        : <Loading />
    );
}

export default JobSearchApp;
