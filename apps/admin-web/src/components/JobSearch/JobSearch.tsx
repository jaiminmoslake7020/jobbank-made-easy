import React, {useCallback} from 'react';
import {Button, AutoComplete, AutoCompleteItemProp} from 'ui';
import {SearchQueryType} from '../../types/app';

export type JobSearchPropTypes = {
    searchForm: SearchQueryType,
    setSearchForm: React.Dispatch<React.SetStateAction<SearchQueryType>>,
    onSubmit: React.FormEventHandler<HTMLFormElement>,
    disabledBtn: boolean,
    cityList: AutoCompleteItemProp[],
    jobSearchKeywords: AutoCompleteItemProp[],
};

const JobSearch = (props: JobSearchPropTypes) => {
    const {
        searchForm, setSearchForm, onSubmit, disabledBtn: disabled, cityList, jobSearchKeywords
    } = props;

    const handleChange = useCallback((e) => {
        setSearchForm((prev) => ({...prev, [e.target.name] : e.target.value }))
    }, [setSearchForm])

    const onLmiaChange = useCallback((e) => {
        setSearchForm(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    }, [setSearchForm])

    return (
      <div className={"job-search-container"}>
        <form onSubmit={onSubmit} >
          <div className={"first-row-form"}>
            <div className={"keywords-input"}>
                <AutoComplete
                    data={jobSearchKeywords}
                    inputProps={{
                        placeholder: "Job title, employer",
                        name: "search",
                        type: "text",
                        value: searchForm.search,
                        onChange: handleChange,
                    }}
                />
            </div>
            <div className={"location-input"}>
              <AutoComplete
                data={cityList}
                inputProps={{
                  placeholder: "City, province or territory",
                  name: "location",
                  type: "text",
                  value: searchForm.location,
                  onChange: handleChange,
                }}
              />
            </div>
            <div className={"btn-box"}>
              <Button type={"submit"} disabled={disabled}>
                Search
              </Button>
            </div>
          </div>
          <div className={"second-row-form"}>
            <label className={"label"}>
              <input
                type={"checkbox"}
                name={"isLmia"}
                checked={searchForm.isLmia}
                onChange={onLmiaChange}
              />
              <span>LMIA</span>
            </label>
          </div>
        </form>
      </div>
    );
}

export default JobSearch;
