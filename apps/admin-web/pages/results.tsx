"use client";

import JobSearchResults from '../src/components/JobSearchResults/JobSearchResults';
import MainContent from '../src/components/MainContent/MainContent';

export default function Web() {
  return (
      <MainContent pageNameClass={"results-page"} >
          <JobSearchResults />
      </MainContent>
  );
}
