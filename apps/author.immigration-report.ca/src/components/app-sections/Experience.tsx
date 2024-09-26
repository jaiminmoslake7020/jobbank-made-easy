import React, {useState, memo} from 'react';
import ExperienceBox, {ExperienceBoxEmpty} from './ExperienceBox';
import {useScreenType} from '../../utils/utils';
import {ScrollElement, useWindowSize} from 'ui';
import { experiences } from '../../data';

// eslint-disable-next-line react/display-name
const ExperienceList = memo(() => {
    const { width } = useWindowSize();
    const type = useScreenType( width || 0 );
    const gridSizeObject = {
        "xs": 1,
        "sm": 1,
        "md": 3,
        "lg": 3,
        "xl": 5,
        "2xl": 5,
    };

    const [showMore, setShowMore] = useState<boolean>(false);
  return (
      <>
          <h1>Experience</h1>
          <div className={"section-content section-experience-content"}>
              <div className={"experience-wrapper"}>
                  {
                      showMore && experiences.map((experience) => <ExperienceBox key={experience.duration} {...experience} />)
                  }
                  {
                      !showMore && experiences.filter((v, i) => i < gridSizeObject[type || "xl"]).map((experience) => <ExperienceBox key={experience.duration} {...experience} />)
                  }
                  <ExperienceBoxEmpty key={"empty"} showMore={showMore} setShowMore={(v:boolean) => {
                      setShowMore(v);
                      if (!v) {
                          const item = document.querySelector('.section.section-experience');
                          if (item) {
                              item.scrollIntoView({behavior: 'smooth'})
                          }
                      }
                  }} />
              </div>
          </div>
      </>
  )
});

const Experience = () => {
    return (
        <ScrollElement className={"section section-experience"} >
            <ExperienceList />
        </ScrollElement>
    );
}

export default Experience;
