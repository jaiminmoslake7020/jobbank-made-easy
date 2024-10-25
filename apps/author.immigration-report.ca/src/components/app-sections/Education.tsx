import React, {memo} from 'react';
import gecDahodLogo from '../../assets/images/education/gec-dahod.png';
import langaraLogo from '../../assets/images/education/langara.png';
import EducationBox, {EducationBoxPropTypes} from './EducationBox';
import {ScrollElement, useScrollY} from 'ui';

const education = [
    {
        degreeName: "Bachelors of Engineering in Computer Engineering",
        collageName: "Government Engineering College",
        duration: "JUNE 20009 - MAY 2013",
        location: "Dahod, GJ, India",
        collageLogo: gecDahodLogo,
        collageLink: "https://www.gecdahod.ac.in/",
        LogoAppearance: 'black-text',
    },
    {
        degreeName: "Postgraduate Diploma In Web Applications and Mobile Design And Development",
        collageName: "Government Engineering College",
        duration: "August 2019 - December 2020",
        location: "Vancouver, BC, Canada",
        collageLogo: langaraLogo,
        collageLink: "https://langara.ca/",
        LogoAppearance: 'white-text',
    },
] as unknown as EducationBoxPropTypes[];


// eslint-disable-next-line react/display-name
const EducationList = memo(() => {
    return (
        <>
            <h1>Education</h1>
            <div className={"section-content section-education-content"}>
                <div className={"education-wrapper"}>
                    {
                        education.map((eduInfo) => <EducationBox key={eduInfo.duration} {...eduInfo} />)
                    }
                </div>
            </div>
        </>
    );
})


const Education = () => {
    return (
        <ScrollElement className={"section section-education"} >
            <EducationList />
        </ScrollElement>
    );
}

export default Education;
