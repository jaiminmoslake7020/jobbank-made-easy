import emplaceLogo from '../assets/images/companies/emplace.svg';
import intercapLogo from '../assets/images/companies/intercap.png';
import umbracityLogo from '../assets/images/companies/umbracity.png';
import processFastLogo from '../assets/images/companies/processFast.png';
import swingLogo from '../assets/images/companies/swing.png';
import {ExperienceBoxPropTypes} from '../types';

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
