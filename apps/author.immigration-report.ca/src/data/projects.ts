import emplaceLogo from '../assets/images/companies/emplace.svg';
import umbracityLogo from '../assets/images/companies/umbracity.png';
import processFastLogo from '../assets/images/companies/processFast.png';
import {ProjectBoxPropTypes} from '../types';

import buyer1 from '../assets/images/projects/buyer/1.png';
import buyer2 from '../assets/images/projects/buyer/2.png';
import buyer3 from '../assets/images/projects/buyer/3.png';
import buyer4 from '../assets/images/projects/buyer/4.png';
import buyer5 from '../assets/images/projects/buyer/5.png';
import buyer6 from '../assets/images/projects/buyer/6.png';
import buyer7 from '../assets/images/projects/buyer/7.png';
import buyer8 from '../assets/images/projects/buyer/8.png';
import buyer9 from '../assets/images/projects/buyer/9.png';

import classifieds1 from '../assets/images/projects/classifieds/1.png';
import classifieds2 from '../assets/images/projects/classifieds/2.png';
import classifieds3 from '../assets/images/projects/classifieds/3.png';
import classifieds4 from '../assets/images/projects/classifieds/4.png';
import classifieds5 from '../assets/images/projects/classifieds/5.png';
import classifieds6 from '../assets/images/projects/classifieds/6.png';
import classifieds7 from '../assets/images/projects/classifieds/7.png';
import classifieds8 from '../assets/images/projects/classifieds/8.png';
import classifieds9 from '../assets/images/projects/classifieds/9.png';

import emplaceWebsite1 from '../assets/images/projects/emplace-website/1.png';
import emplaceWebsite2 from '../assets/images/projects/emplace-website/2.png';

import myBox1 from '../assets/images/projects/my.box/1.png';
import myBox2 from '../assets/images/projects/my.box/2.png';
import logo from '../assets/images/projects/my.box/logo.png';

import umbracitymaps1 from '../assets/images/projects/umbracity-maps/1.png';
import umbracitymaps3 from '../assets/images/projects/umbracity-maps/3.png';
import umbracitymaps4 from '../assets/images/projects/umbracity-maps/4.png';
import umbracitymaps5 from '../assets/images/projects/umbracity-maps/5.png';
import umbracitymaps6 from '../assets/images/projects/umbracity-maps/6.png';

import umbracitymobileaapp1 from '../assets/images/projects/umbracity-mobilea-app/1.png';
import umbracitymobileaapp2 from '../assets/images/projects/umbracity-mobilea-app/2.png';
import umbracitymobileaapp3 from '../assets/images/projects/umbracity-mobilea-app/3.png';
import umbracitymobileaapp4 from '../assets/images/projects/umbracity-mobilea-app/4.png';

import umbracitywebsite1 from '../assets/images/projects/umbracity-website/1.png';
import umbracitywebsite2 from '../assets/images/projects/umbracity-website/2.png';
import umbracitywebsite3 from '../assets/images/projects/umbracity-website/3.png';
import umbracitywebsite4 from '../assets/images/projects/umbracity-website/4.png';
import umbracitywebsite5 from '../assets/images/projects/umbracity-website/5.png';
import umbracitywebsite6 from '../assets/images/projects/umbracity-website/6.png';

import weather1 from '../assets/images/projects/weather/1.png';
import weather2 from '../assets/images/projects/weather/2.png';


export const projects = [
    {
        projectName: "Buyer Platform",
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
        techStack: 'React, TypeScript, MapBox, Redux, Tailwind, SCSS,  MUI, Storybook, Jest, Cypress, NestJs, PostgreSql, OpenApiV3, AWS',
        images: [
            buyer1,
            buyer2,
            buyer3,
            buyer4,
            buyer5,
            buyer6,
            buyer7,
            buyer8,
            buyer9
        ]
    },
    {
        projectName: "UmbraCity Mobile User App",
        companyName: "UmbraCity Innovations Inc",
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
        techStack: 'ReactNative, TypeScript, Redux, Tailwind, SCSS, Jest, GCM',
        images: [
            umbracitymobileaapp1,
            umbracitymobileaapp2,
            umbracitymobileaapp3,
            umbracitymobileaapp4
        ]
    },
    {
        projectName: "UmbraCity Maps",
        companyName: "UmbraCity Innovations Inc",
        projectUrl: "https://map.umbracity.com/",
        projectTech: "React, TypeScript, Rest API, Redux",
        projectLogo: umbracityLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole frontend of this product from scratch.',
            'These are different maps providing different functionalities to different users. But all of these maps share the same code base, these maps will be based on the domain it is on, and based on the domain it will use the configurations provided for that domain.',
            'It will change its view based on this configuration, hiding and showing filters, showing data based on this config.'
        ],
        techStack: 'React, TypeScript, MapBox, Redux, Tailwind, SCSS,  MUI, Storybook, Jest, Cypress, NestJs, PostgreSql, OpenApiV3, AWS',
        images: [
            umbracitymaps1,
            umbracitymaps3,
            umbracitymaps4,
            umbracitymaps5,
            umbracitymaps6
        ]
    },
    {
        projectName: "my.box",
        companyName: "Intercap",
        projectUrl: "https://my.box/",
        projectTech: "NextJs, Turborepo, Storybook, Jest, Cypress",
        projectLogo: logo,
        logoAppearance: "",
        projectPoints: [
            'I have built the whole homepage.',
            'I also contributed in development of other components and other pages of this product',
            'Developed account settings and whois section page at multiple locations on website.',
        ],
        techStack: "NextJs, Turborepo, Storybook, Jest, Tailwind, SCSS, Cypress",
        images: [
            myBox1,
            myBox2
        ]
    },
    {
        projectName: "UmbraCity Website",
        companyName: "UmbraCity Innovations Inc",
        projectUrl: "http://umbracity.com/",
        projectTech: "NextJs, TypeScript, Tailwind",
        projectLogo: umbracityLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole website from scratch.',
            'I had also built the same website first in wordpress as the old website used to be in wordpress.'
        ],
        techStack: 'NextJs, TypeScript, Turborepo, Tailwind, SCSS, Jest, Cypress',
        images:[
            umbracitywebsite1,
            umbracitywebsite2,
            umbracitywebsite3,
            umbracitywebsite4,
            umbracitywebsite5,
            umbracitywebsite6,
        ]
    },
    {
        projectName: "Emplace Website",
        companyName: "Emplace Technology Inc",
        projectUrl: "https://emplace.com/",
        projectTech: "NextJs, TypeScript, Tailwind",
        projectLogo: emplaceLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole website from scratch.',
        ],
        techStack: 'NextJs, TypeScript, Tailwind, SCSS, Jest, Cypress',
        images: [
            emplaceWebsite1,
            emplaceWebsite2
        ]
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
        techStack: 'React, TypeScript, MapBox, Redux, Tailwind, SCSS,  MUI, Storybook, Jest, Cypress, AWS',
        images:[
            classifieds1,
            classifieds2,
            classifieds3,
            classifieds4,
            classifieds5,
            classifieds6,
            classifieds7,
            classifieds8,
            classifieds9,
        ]
    },
    {
        projectName: "Weather Kiosk App",
        companyName: "UmbraCity Innovations Inc",
        projectUrl: "https://amazing-carson-dc0b4c.netlify.app",
        projectTech: "React",
        projectLogo: umbracityLogo,
        logoAppearance: "white-text",
        projectPoints: [
            'I have built the whole frontend of this product from scratch.',
            'I built this one to be used as a local web app to be available on UmbraCity kiosks as a weather addon.'
        ],
        techStack: 'React, TypeScript, Redux, Tailwind, SCSS',
        images: [
            weather1,
            weather2
        ]
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
        techStack: 'React, TypeScript, MapBox, Redux, Tailwind, SCSS,  MUI, Storybook, Jest, Cypress, AWS',
    },
    {
        projectName: "Owner Platform",
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
        projectName: "OpsInsights",
        companyName: "ProcessFast LLC",
        projectUrl: "https://opsinsights.com/",
        projectTech: "PHP, Yii 2.0, MySql",
        projectLogo: processFastLogo,
        logoAppearance: "",
        projectPoints: [
            'I have built the MVP and real product from scratch.',
            'I was the initial member of the team, who built the MVP and later built the whole SAAS platform with the help of the CEO and the other team member who was responsible for building the UX of the website.',
            'This web application allowed its user to view reports and data visualizations, request new reports and data visualizations, and from backend allowed admins to create and assign reports to clients. Clients can also manage their own users and allow access to reports to users.',
        ],
        techStack: 'PHP, YII 2.0, MySql, AWS'
    }
] as ProjectBoxPropTypes[];
