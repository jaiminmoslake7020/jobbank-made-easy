"use client";

import JobSearchApp from '../src/components/JobSearch/JobSearchApp';
import MainContent from '../src/components/MainContent/MainContent';

export default function Web() {
  return (
      <MainContent pageNameClass={"index-page"} >
          <JobSearchApp />
      </MainContent>
  );
}
