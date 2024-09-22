import React, {useState} from 'react';
import ProjectBox, {ProjectBoxEmpty, ProjectBoxPropTypes} from './ProjectBox';
import {useWindowSize} from '@uidotdev/usehooks';
import {useScreenType} from '../../utils/utils';
import emplaceLogo  from '../../assets/images/companies/emplace.svg';
import umbracityLogo  from '../../assets/images/companies/umbracity.png';
import opsinsightsLogo  from '../../assets/images/companies/opsinsights.png';

const projects = [
    {
        projectName: "Owner Platform ",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://owner.emplace.com/",
        projectTech: "React, TypeScript, Rest API, Redux",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text"
    },
    {
        projectName: "Buyer Platform ",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://buyer.emplace.com/",
        projectTech: "React, TypeScript, Rest API, Redux",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text"
    },
    {
        projectName: "UmbraCity Mobile User App",
        companyName: "Emplace Technology Inc",
        projectUrl: [{
            icon: "apple",
            url: "https://apps.apple.com/us/app/umbracity/id1540808911"
        }, {
            icon: "android",
            url: "https://play.google.com/store/apps/details?id=com.umbracity.prod&hl=en_CA"
        }],
        projectTech: "React-Native, TypeScript, Rest API",
        projectLogo: umbracityLogo,
        logoAppearance: ""
    },
    {
        projectName: "UmbraCity Maps",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://owner.emplace.com/",
        projectTech: "React, TypeScript, Rest API, Redux",
        projectLogo: umbracityLogo,
        logoAppearance: "white-text"
    },
    {
        projectName: "UmbraCity Website",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://owner.emplace.com/",
        projectTech: "NextJs, TypeScript, Tailwind",
        projectLogo: umbracityLogo,
        logoAppearance: "white-text"
    },
    {
        projectName: "Emplace Website",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://owner.emplace.com/",
        projectTech: "NextJs, TypeScript, Tailwind",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text"
    },
    {
        projectName: "Classifieds Posting Platform",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://classifieds.emplace.com/",
        projectTech: "React, TypeScript, Rest API, Redux",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text"
    },
    {
        projectName: "Weather Kiosk App",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://umbracity.com/",
        projectTech: "React",
        projectLogo: umbracityLogo,
        logoAppearance: "white-text"
    },
    {
        projectName: "Classifieds FireTV Web App",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://emplace.com/",
        projectTech: "React, TypeScript",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text"
    },
    {
        projectName: "OpsInsights",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://owner.emplace.com/",
        projectTech: "PHP, Yii 2.0, MySql",
        projectLogo: opsinsightsLogo,
        logoAppearance: ""
    }
] as ProjectBoxPropTypes[];

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
