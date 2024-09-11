"use client";

import JobSearchResults from '../src/components/JobSearchResults/JobSearchResults';
import MainContent from '../src/components/MainContent/MainContent';
import JobSearchApp from '../src/components/JobSearch/JobSearchApp';

export default function Web() {
  return (
      <MainContent pageNameClass={"results-page"} >
          <JobSearchResults />
      </MainContent>
  );
}
