"use client";

import JobSearch from '../src/components/JobSearch/JobSearch';
import MainContent from '../src/components/MainContent/MainContent';

export default function Web() {
  return (
      <MainContent pageNameClass={"index-page"} >
          <JobSearch />
      </MainContent>
  );
}
