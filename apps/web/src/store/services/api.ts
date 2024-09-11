import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5002/'
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    hello: builder.query<{ message: string }, void>({
      query: () => ({
        url: "/",
      }),
    }),
    new: builder.query<{ message: string }, void>({
      query: () => ({
        url: "/",
      }),
    }),
    searchJobs: builder.query<{ message: string }, string>({
      query: (search) => ({
        url: `/search${search}`,
      }),
      keepUnusedDataFor: 5, // Keep the data fresh for 5 seconds
      refetchOnMountOrArgChange: false, // Prevent refetching on mount or arg change
    }),
  }),
});

export const { useHelloQuery, useNewQuery, useSearchJobsQuery } = api;
