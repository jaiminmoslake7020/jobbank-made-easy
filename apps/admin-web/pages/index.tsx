"use client";

import JobSearchApp from '../src/components/JobSearch/JobSearchApp';
import MainContent from '../src/components/MainContent/MainContent';
import {Alert} from 'ui';

export default function Web() {
  return (
      <MainContent pageNameClass={"index-page"} >
          <Alert type={"success"} message={"Hello"} />
          <JobSearchApp />
      </MainContent>
  );
}
