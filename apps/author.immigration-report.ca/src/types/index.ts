import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {StaticImageData} from 'next/image';

export type MenuLinkType = {
    label: string,
    content: string
};

export type ProjectBoxPropTypes = {
    projectName: string,
    companyName: string,
    projectUrl: {
        icon: IconProp,
        url: string
    }[] | string,
    projectTech: string,
    projectLogo: string,
    logoAppearance: string,
    projectPoints: string[],
    techStack: string,
    images?: StaticImageData[],
};

export type ThemeType = {
    btnLabel: string,
    btnTheme: string
};


export type ExperienceBoxPropTypes = {
    companyName: string,
    location: string,
    duration: string,
    jobTitle: string,
    companyLogo: string,
    companyLink: string,
    companyLogoAppearance: string,
    experiencePoints: string[],
    companyInfo: string,
};
