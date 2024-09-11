import React, {useCallback, useEffect, useState} from 'react';
import {Button} from 'ui';
import {getJobSearch} from './useJobSearch';
import {useRouter} from 'next/router';
import {SearchQueryType} from '../../types/app';

const JobSearch = () => {
    const router = useRouter();
    const [searchForm, setSearchForm] = useState<SearchQueryType>({
        search: '',
        location: '',
        isLmia: false
    });
    const handleChange = useCallback((e) => {
        setSearchForm((prev) => ({...prev, [e.target.name] : e.target.value }))
    }, [])

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const searchString = searchForm.search;
        const locationString = searchForm.location;
        let queryParams = searchString ? `search=${searchString}` : 'search=';
        queryParams += locationString ? `&location=${locationString}` : '&location=';
        queryParams += searchForm.isLmia ? `&isLmia=${searchForm.isLmia}` : '&isLmia=';
        if (searchString !== '' ||  locationString !== '') {
            router.push(`/results?${queryParams}`);
        }
    }, [router, searchForm])

    const onLmiaChange = useCallback((e) => {
        setSearchForm(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    }, [])

    useEffect(() => {
        const mount = () => {
            // setSearchForm(query);
            const query = getJobSearch();
            setSearchForm(query);
        };
        return mount();
    }, [])

    return (
        <div className={"job-search-container"} >
            <form onSubmit={onSubmit}>
                <div className={"first-row-form"}>
                    <div className={"keywords-input"}>
                        <input placeholder={"Job title, employer"} name={"search"} type="text" value={searchForm.search} onChange={handleChange} />
                    </div>
                    <div className={"location-input"}>
                        <input placeholder={"City, province or territory"} name={"location"} type="text" value={searchForm.location} onChange={handleChange} />
                    </div>
                    <div className={"btn-box"}>
                        <Button type={"submit"} >Search</Button>
                    </div>
                </div>
                <div className={"second-row-form"}>
                    <label className={"label"}>
                        <input type={"checkbox"} name={"isLmia"} checked={searchForm.isLmia} onChange={onLmiaChange} />
                        <span>LMIA</span>
                    </label>
                </div>
            </form>
        </div>
    );
}

export default JobSearch;
