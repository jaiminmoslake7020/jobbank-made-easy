"use client";

import MainContent from '../src/components/MainContent/MainContent';
import JobApplicationList from '../src/components/app/JobApplication/List/JobApplicationList';

export default function Web() {
  return (
      <MainContent pageNameClass={"index-page"} >
          <JobApplicationList />
      </MainContent>
  );
}
