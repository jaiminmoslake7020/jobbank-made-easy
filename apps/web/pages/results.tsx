"use client";

import JobSearchResults from '../src/components/JobSearchResults/JobSearchResults';
import MainContent from '../src/components/MainContent/MainContent';

export default function Results() {
  return (
      <MainContent pageNameClass={"results-page"} >
          <JobSearchResults />
      </MainContent>
  );
}
