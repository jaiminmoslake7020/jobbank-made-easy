import React, {useState} from 'react';
import ExperienceBox, {ExperienceBoxEmpty, ExperienceBoxPropTypes} from './ExperienceBox';
import emplaceLogo  from '../../assets/images/companies/emplace.svg';
import umbracityLogo  from '../../assets/images/companies/umbracity.png';
import intercapLogo  from '../../assets/images/companies/intercap.png';
import processFastLogo  from '../../assets/images/companies/processFast.png';
import swingLogo  from '../../assets/images/companies/swing.png';
import {useScreenType} from '../../utils/utils';
import {useWindowSize} from '@uidotdev/usehooks';

const experiences = [
    {
        companyName: "Emplace Technology Inc",
        location: "Vancouver, BC, Canada",
        duration: "September 2022 - August 2024",
        jobTitle: "Software Developer",
        companyLogo: emplaceLogo,
        companyLink: "https://emplace.com/",
        companyLogoAppearance: 'white-text',
    },
    {
        companyName: "Intercap Inc",
        location: "Toronto, ON, Canada",
        duration: "February 2023 - January 2024",
        jobTitle: "Javascript Developer - ( Part time Freelancing, Remote )",
        companyLogo: intercapLogo,
        companyLink: "https://intercap.com/",
        companyLogoAppearance: 'white-text',
    },
    {
        companyName: "UmbraCity Innovations Inc",
        location: "Vancouver, BC, Canada",
        duration: "January 2021 - September 2022",
        jobTitle: "Software Developer",
        companyLogo: umbracityLogo,
        companyLink: "http://umbracity.com/",
        companyLogoAppearance: 'white-text',
    },
    {
        companyName: "UmbraCity Innovations Inc",
        location: "Vancouver, BC, Canada",
        duration: "March 2020 - December 2020",
        jobTitle: "PHP Developer",
        companyLogo: umbracityLogo,
        companyLink: "http://umbracity.com/",
        companyLogoAppearance: 'white-text',
    },
    {
        companyName: "ProcessFast LLC",
        location: "Columbia, SC, USA",
        duration: "January 2016 - August 2019",
        jobTitle: "Lead PHP Developer (Remote)",
        companyLogo: processFastLogo,
        companyLink: "https://processfast.com/",
        companyLogoAppearance: 'black-text',
    },
    {
        companyName: "Swing IT Service PVT Ltd",
        location: "Ahmedabad, GJ, India",
        duration: "May 2014 - December 2016",
        jobTitle: "Senior PHP Developer",
        companyLogo: swingLogo,
        companyLink: "https://www.swingitservices.com/",
        companyLogoAppearance: 'purple-text',
    },
    {
        companyName: "Swing IT Service PVT Ltd",
        location: "Ahmedabad, GJ, India",
        duration: "September 2013 - March 2014",
        jobTitle: "Junior PHP Developer",
        companyLogo: swingLogo,
        companyLink: "https://www.swingitservices.com/",
        companyLogoAppearance: 'purple-text',
    },
    {
        companyName: "Swing IT Service PVT Ltd",
        location: "Ahmedabad, GJ, India",
        duration: "June 2013 - August 2013",
        jobTitle: "PHP Developer Trainee",
        companyLogo: swingLogo,
        companyLink: "https://www.swingitservices.com/",
        companyLogoAppearance: 'purple-text',
    }
] as ExperienceBoxPropTypes[];

const Experience = () => {
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
        <section className={"section section-experience"} >
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
        </section>
    );
}

export default Experience;
