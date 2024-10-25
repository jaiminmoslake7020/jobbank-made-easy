"use client";

import MainContent from '../../src/components/MainContent/MainContent';
import JobApplicationCreate from '../../src/components/app/JobApplication/Create/JobApplicationCreate';

export default function Web() {
  return (
      <MainContent pageNameClass={"job-application-create-page"} >
          <JobApplicationCreate />
      </MainContent>
  );
}
