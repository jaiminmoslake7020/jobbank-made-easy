import Head from 'next/head'
import Profile from '../src/components/app-sections/Profile';
import Experience from '../src/components/app-sections/Experience';
import Projects from '../src/components/app-sections/Projects';
import Skills from '../src/components/app-sections/Skills';
import Education from '../src/components/app-sections/Education';
import MainContent from '../src/components/MainContent';

export default function Web() {

  return (
      <>
          <Head>
              <title>Jaimin Pandya</title>
          </Head>
          <MainContent pageNameClass={"index"} >
              <main className={"main-content"}>
                  <Profile />
                  <Experience />
                  <Projects />
                  <Skills />
                  <Education />
              </main>
          </MainContent>
      </>
  );
}
