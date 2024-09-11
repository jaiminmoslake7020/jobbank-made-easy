"use client";

import JobSearch from '../src/components/JobSearch/JobSearch';
import JobSearchResults from '../src/components/JobSearchResults/JobSearchResults';
import MainContent from '../src/components/MainContent/MainContent';

export default function Web() {
  return (
      <MainContent pageNameClass={"results-page"} >
          <JobSearch />
          <JobSearchResults />
      </MainContent>
  );
}
