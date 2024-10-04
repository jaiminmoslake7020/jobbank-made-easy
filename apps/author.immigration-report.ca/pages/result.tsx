import Head from 'next/head'
import Profile from '../src/components/app-sections/Profile';
import Experience from '../src/components/app-sections/Experience';
import Projects from '../src/components/app-sections/Projects';
import Skills from '../src/components/app-sections/Skills';
import Education from '../src/components/app-sections/Education';
import MainContent from '../src/components/MainContent';
import {useRouter} from 'next/navigation';
import {useCallback, useState} from 'react';

export default function Web() {

    const router = useRouter();

    const [count, setCount] = useState<number>(0);
    const [countNew, setCountNew] = useState<number>(0);


    const btnClick = () => {
        router.push("");
        //router.push("/results");
        //setCount(count + 1);
        //await fetch();
    };
    // []

    var countOne = 1;

  return (
      <>
          <Head>
              <title>Jaimin Pandya</title>
          </Head>
          <MainContent pageNameClass={"index"} >
              <main className={"main-content"}>


                  <button type={"button"} onClick={() => {
                      //setCount(count + 1);
                      countOne = countOne + 1;
                      setCountNew(countNew + 1);
                  }} >{count}-{countNew}</button>

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
