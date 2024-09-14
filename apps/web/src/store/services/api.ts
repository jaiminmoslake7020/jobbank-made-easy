import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {JobDetailsAllType} from 'types';

export const apiFreeze = {
  searchJobs: 0,
  getJobDetails: 2,
  searchKeys: 5
};

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5003/'
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    searchJobs: builder.query<JobDetailsAllType[], string>({
      query: (search) => ({
        url: `/search${search}`,
      }),
      keepUnusedDataFor: apiFreeze.searchJobs, // Keep the data fresh for 5 seconds
    }),
    getSearchKeys: builder.query<string[], string>({
      query: () => ({
        url: `/search-keys`,
      }),
      keepUnusedDataFor: apiFreeze.searchKeys, // Keep the data fresh for 5 seconds
    }),
  }),
});

export const { useSearchJobsQuery, useGetSearchKeysQuery } = api;
