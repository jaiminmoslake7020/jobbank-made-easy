"use client";

import MainContent from '../../src/components/MainContent/MainContent';
import JobApplicationCreate from '../../src/components/app/JobApplication/Create/JobApplicationCreate';
import {NewJobApplicationFormContextProvider} from '../../src/contexts/NewJobApplicationFormProvider';

export default function Web() {
  return (
      <MainContent pageNameClass={"job-application-create-page authenticated-page"} >
          <NewJobApplicationFormContextProvider>
              <JobApplicationCreate />
          </NewJobApplicationFormContextProvider>
      </MainContent>
  );
}
