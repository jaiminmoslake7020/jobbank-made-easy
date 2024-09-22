import {SocialLinkType, ThemeType} from 'ui';
import {MenuLinkType} from '../components/Nav';

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
