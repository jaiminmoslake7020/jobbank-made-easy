import {SocialLinkType, ThemeType} from 'ui';
import {ExperienceBoxPropTypes, MenuLinkType, ProjectBoxPropTypes} from '../types';
import emplaceLogo from '../assets/images/companies/emplace.svg';
import umbracityLogo from '../assets/images/companies/umbracity.png';
import opsinsightsLogo from '../assets/images/companies/opsinsights.png';
import intercapLogo from '../assets/images/companies/intercap.png';
import processFastLogo from '../assets/images/companies/processFast.png';
import swingLogo from '../assets/images/companies/swing.png';

export const menuLinksHeader = [
    {
        label: "Profile",
        content: "profile"
    },
    {
        label: "Experience",
        content: "experience"
    },
    {
        label: "Projects",
        content: "projects"
    },
    {
        label: "Skills",
        content: "skills"
    },
    {
        label: "Education",
        content: "education"
    },
] as MenuLinkType[];

export const themes = [
    {
        btnLabel: 'Light',
        btnTheme: 'light'
    },
    {
        btnLabel: 'Dark',
        btnTheme: 'dark'
    },
    {
        btnLabel: 'Blue',
        btnTheme: 'blue'
    },
    {
        btnLabel: 'Green',
        btnTheme: 'green'
    },
    {
        btnLabel: 'Purple',
        btnTheme: 'purple'
    },
] as ThemeType[];

export const socialLinks = [
    {
        label: "Github",
        link: "https://github.com/jaiminmoslake7020",
        icon: "github",
        tooltip: {
            title: "Github Active Years",
            content: "2016, 2017, 2018, 2019, 2020, 2021, 2023"
        }
    },
    {
        label: "Gitlab",
        link: "https://gitlab.com/jaiminpandya1591",
        icon: "gitlab",
        tooltip: {
            title: "Gitlab Active Years",
            content: "2021, 2022, 2023, 2024"
        }
    },
    {
        label: "LinkedIn",
        link: "https://www.linkedin.com/in/jaiminmoslake/",
        icon: "linkedin"
    },
    {
        label: "Stack Overflow",
        link: "https://stackoverflow.com/users/2542806/jaimin-moslake",
        icon: "stack-overflow"
    },
] as SocialLinkType[];


export const projects = [
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


export const experiences = [
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
