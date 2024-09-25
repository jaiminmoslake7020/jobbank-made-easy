import {IconProp} from '@fortawesome/fontawesome-svg-core';

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
    logoAppearance: string
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
    companyLogoAppearance: string
};
