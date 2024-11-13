import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {JobDetailsAllType, SessionBodyDto, SessionResponseType} from 'types';
import {AddressRequestBody} from '../../types/app';
import {getLocalSession} from '../../hooks';


export const apiFreeze = {
  searchJobs: 0,
  getJobDetails: 2,
  searchKeys: 5
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl);
export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    searchJobs: builder.query<JobDetailsAllType[], string>({
      query: (search) => ({
        url: `/search${search}`,
      }),
      keepUnusedDataFor: apiFreeze.searchJobs, // Keep the data fresh for 5 seconds
    }),
    postCompany: builder.query<any, AddressRequestBody>({
      query: (data) => ({
        url: `/company`,
        method: 'POST',
        body: data,
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
          'Authorization': 'Bearer '+(getLocalSession()?.accessToken)
        }
      }),
    }),
    listCompany: builder.query({
      query: () => ({
        url: `/company`,
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
          'Authorization': 'Bearer '+(getLocalSession()?.accessToken)
        }
      }),
    }),
    getFormCreateData: builder.query({
      query: () => ({
        url: `/job-application/form-create-data`,
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
          'Authorization': 'Bearer '+(getLocalSession()?.accessToken)
        }
      }),
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

export const {
  useListCompanyQuery,
  useLazyListCompanyQuery,
  useLazyPostCompanyQuery,
  useLazyRefreshTokenQuery,
  useLazySessionQuery,
    useGetFormCreateDataQuery,
    useLazyGetFormCreateDataQuery
} = api;
