import React, {useState} from 'react';
import ProjectBox, {ProjectBoxEmpty} from './ProjectBox';
import {useWindowSize} from 'ui';
import {useScreenType} from '../../utils/utils';
import { projects } from '../../data';

const Projects = () => {

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
        <section className={"section section-projects"} >
            <h1>Projects</h1>
            <div className={"section-content section-projects-content"}>
                <div className={"projects-wrapper"}>
                    {
                        showMore && projects.map((project) => <ProjectBox key={project.projectName} {...project} />)
                    }
                    {
                        !showMore && projects.filter((v, i) => i < gridSizeObject[type || "xl"]).map((project) => <ProjectBox key={project.projectName} {...project} />)
                    }
                    <ProjectBoxEmpty key={"empty"} showMore={showMore} setShowMore={(v:boolean) => {
                        setShowMore(v);
                        if (!v) {
                            const item = document.querySelector('.section.section-projects');
                            if (item) {
                                item.scrollIntoView({behavior: 'smooth'})
                            }
                        }
                    }} />
                </div>
            </div>
        </section>
    );
}

export default Projects;
