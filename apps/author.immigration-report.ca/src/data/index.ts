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
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole frontend of this product from scratch.',
            'This is a software platform built for the Emplace Screen Owners to control their screen content, what content (their own) can play on their screens, and what advertisements can play on their screen.',
            'Screen owners can manage their organization screens and enable other users in organization to have permissions through RBAC to give control to different actions on screen.'
        ],
        techStack: 'React, TypeScript, Canvas, Redux, Tailwind, SCSS,  MUI, Storybook, Jest, Cypress, NestJs, PostgreSql, OpenApiV3, AWS'
    },
    {
        projectName: "Buyer Platform ",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://buyer.emplace.com/",
        projectTech: "React, TypeScript, Rest API, Redux",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole frontend of this product from scratch.',
            'This is a software platform built for all users to advertise their content on UmbraCity and Emplace screens. Users can choose screens using maps with different filters such as map locations, point of interests, different networks ( such as campus, residentials, commercial, arenas ).',
            'This platform allows users to create and manage advertisement campaigns to run on Emplace screens and UmbraCity Kiosks.'
        ],
        techStack: 'React, TypeScript, MapBox, Redux, Tailwind, SCSS,  MUI, Storybook, Jest, Cypress, NestJs, PostgreSql, OpenApiV3, AWS'
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
        logoAppearance: "",
        projectPoints: [
            'I added new features to already built ReactNative app.',
            'I have added the latest functionalities to this app such as notifications, touchless borrow, notification routing, QR code scanning, new enhanced permission flow for better UX, different API region support.',
        ],
        techStack: 'ReactNative, TypeScript, Redux, Tailwind, SCSS, Jest, GCM'
    },
    {
        projectName: "UmbraCity Maps",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://owner.emplace.com/",
        projectTech: "React, TypeScript, Rest API, Redux",
        projectLogo: umbracityLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole frontend of this product from scratch.',
            'These are different maps providing different functionalities to different users. But all of these maps share the same code base, these maps will be based on the domain it is on, and based on the domain it will use the configurations provided for that domain.',
            'It will change its view based on this configuration, hiding and showing filters, showing data based on this config.'
        ],
        techStack: 'React, TypeScript, MapBox, Redux, Tailwind, SCSS,  MUI, Storybook, Jest, Cypress, NestJs, PostgreSql, OpenApiV3, AWS'
    },
    {
        projectName: "UmbraCity Website",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://owner.emplace.com/",
        projectTech: "NextJs, TypeScript, Tailwind",
        projectLogo: umbracityLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole website from scratch.',
            'I had also built the same website first in wordpress as the old website used to be in wordpress.'
        ],
        techStack: 'NextJs, TypeScript, Turborepo, Tailwind, SCSS, Jest, Cypress'
    },
    {
        projectName: "Emplace Website",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://owner.emplace.com/",
        projectTech: "NextJs, TypeScript, Tailwind",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole website from scratch.',
        ],
        techStack: 'NextJs, TypeScript, Tailwind, SCSS, Jest, Cypress'
    },
    {
        projectName: "Classifieds Posting Platform",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://classifieds.emplace.com/",
        projectTech: "React, TypeScript, Rest API, Redux",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole frontend of this product from scratch.',
            'This will allow users to scan QR code on emplace screen and allow them to post classifieds on classifieds area on Emplace Screen.'
        ],
        techStack: 'React, TypeScript, MapBox, Redux, Tailwind, SCSS,  MUI, Storybook, Jest, Cypress, AWS'
    },
    {
        projectName: "Weather Kiosk App",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://umbracity.com/",
        projectTech: "React",
        projectLogo: umbracityLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole frontend of this product from scratch.',
            'I built this one to be used as a local web app to be available on UmbraCity kiosks as a weather addon.'
        ],
        techStack: 'React, TypeScript, Redux, Tailwind, SCSS'
    },
    {
        projectName: "Classifieds FireTV Web App",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://emplace.com/",
        projectTech: "React, TypeScript",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole frontend of this product from scratch.',
            'I built this one to be used as a local web app to be available on Emplace Screens as a classifieds player addon.'
        ],
        techStack: 'React, TypeScript, MapBox, Redux, Tailwind, SCSS,  MUI, Storybook, Jest, Cypress, AWS'
    },
    {
        projectName: "OpsInsights",
        companyName: "ProcessFast LLC",
        projectUrl: "https://owner.emplace.com/",
        projectTech: "PHP, Yii 2.0, MySql",
        projectLogo: opsinsightsLogo,
        logoAppearance: "",
        projectPoints: [
            'I have built the MVP and real product from scratch.',
            'I was the initial member of the team, who built the MVP and later built the whole SAAS platform with the help of the CEO and the other team member who was responsible for building the UX of the website.',
            'This web application allowed its user to view reports and data visualizations, request new reports and data visualizations, and from backend allowed admins to create and assign reports to clients. Clients can also manage their own users and allow access to reports to users.',
        ],
        techStack: 'PHP, YII 2.0, MySql, AWS'
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
        experiencePoints : [
            "I solely developed multiple products (frontend) of company, leveraging modern JavaScript technologies to create responsive and dynamic user interfaces.",
            "I also implemented automated testing, set up deployment workflows, and ensured smooth production launches.",
            "Collaborated closely with team members during weekly stand-up meetings to align on project design and development."
        ],
        companyInfo: 'Emplace is a Digital Out Of Home Advertising provider company through its partnership with residentials and small businesses. It is a sibling organization of UmbraCity Innovations Inc, which also involves maintaining projects built for UmbraCity Innovations Inc.'
    },
    {
        companyName: "Intercap Inc",
        location: "Toronto, ON, Canada",
        duration: "February 2023 - January 2024",
        jobTitle: "Javascript Developer - ( Part time Freelancing, Remote )",
        companyLogo: intercapLogo,
        companyLink: "https://intercap.com/",
        companyLogoAppearance: 'white-text',
        experiencePoints : [
            "Collaborated with the team on the development of https://my.box/, contributing significantly to the homepage design and key aspects of the domain-purchase workflow.",
            "Actively participated in daily stand-up meetings to discuss progress and plan the next stages of development.",
        ],
        companyInfo: 'Intercap Inc is an innovative merchant bank that helps entrepreneurs build successful and enduring companies. Our senior leadership team has decades of experience advising entrepreneurs and investing in businesses at all stages of growth.'
    },
    {
        companyName: "UmbraCity Innovations Inc",
        location: "Vancouver, BC, Canada",
        duration: "March 2020 - September 2022",
        jobTitle: "Software Developer",
        companyLogo: umbracityLogo,
        companyLink: "http://umbracity.com/",
        companyLogoAppearance: 'white-text',
        experiencePoints : [
            "Revamped and enhanced the UmbraCity mobile app by integrating new features and improving performance using React Native, leading to a more seamless and user-friendly experience.",
            "Redesigned UmbraCity website using modern JavaScript frameworks, giving the website a fresh and dynamic look.",
            "Contributed to upgrading the payment system in the main backend software.",
            "Regularly attended weekly meetings to provide updates and plan upcoming tasks.",
        ],
        companyInfo: 'UmbraCity is an Umbrella sharing and Digital Out Of Home Advertising company.'
    },
    {
        companyName: "ProcessFast LLC",
        location: "Columbia, SC, USA",
        duration: "January 2016 - August 2019",
        jobTitle: "Lead PHP Developer (Remote)",
        companyLogo: processFastLogo,
        companyLink: "https://processfast.com/",
        companyLogoAppearance: 'black-text',
        experiencePoints: [
            "Collaborated closely with the CEO and product designer to build \"OpsInsights.com - Reporting for Title Agents & Underwriters\" from the ground up.",
            "Played a key role in developing core modules, including Report Creation, Data Visualization, and Report Requests, RBAC and many other features.",
            "Engaged in daily meetings with the CEO and product designer to provide updates, plan upcoming tasks, and refine product design."
        ],
        companyInfo: 'ProcessFast Designs and Develops Enterprise SaaS and Middleware and Sell Those Solutions as a Service.\n'
    },
    {
        companyName: "Swing IT Service PVT Ltd",
        location: "Ahmedabad, GJ, India",
        duration: "June 2013 - December 2016",
        jobTitle: "PHP Developer",
        companyLogo: swingLogo,
        companyLink: "https://www.swingitservices.com/",
        companyLogoAppearance: 'purple-text',
        experiencePoints: [
            "Created online examination web application platform, which offers creating tests, giving students instant test results and many other things. It was built in PHP, YII, MySql.",
            "Developed multiple web-based kiosk applications for ticket and attraction bookings across various theaters in Branson, Missouri.",
            "Led a team of three, coordinating tasks, managing client communications, and providing regular progress reports to senior management.",
            "Learned the Yii framework, JQuery, PHP  and started working on the ticket booking system."
        ],
        companyInfo: 'Swing IT Service PVT Ltd is a consultancy company that creates and maintains different clients as well as in-house projects.'
    }
] as ExperienceBoxPropTypes[];
