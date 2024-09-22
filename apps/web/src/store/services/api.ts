import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {JobDetailsAllType, SessionBodyDto, SessionResponseType} from 'types';


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
    refreshToken: builder.query<SessionResponseType, string>({
      query: (token:string) => ({
        url: `/refresh-token`,
        headers: {
          'Authorization': 'Bearer '+token
        }
      }),
      keepUnusedDataFor: apiFreeze.searchKeys, // Keep the data fresh for 5 seconds
    }),
    session: builder.query<SessionResponseType, SessionBodyDto>({
      query: (data) => ({
        url: `/session`,
        method: 'POST',
        body: data,
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      }),
      keepUnusedDataFor: apiFreeze.searchKeys, // Keep the data fresh for 5 seconds
    }),
  }),
});

export const { useSearchJobsQuery, useLazyRefreshTokenQuery, useGetSearchKeysQuery, useLazySessionQuery } = api;
