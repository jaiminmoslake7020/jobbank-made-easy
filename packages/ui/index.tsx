import './styles/index.scss';
import {
    ColorThemeSelector, ColorThemeButton, FaIcon, Footer, Header, Sidebar, SocialLinks, ThemeType, Alert, Loading
} from "./components/Base";
import JobSearch , {JobSearchPropTypes} from './components/JobSearch/JobSearch'

export * from "./components/Base/Button/Button";
export * from "./components/Base/Badge/Badge";
export * from "./components/AutoComplete/AutoComplete"

export {
    ColorThemeSelector, ColorThemeButton, FaIcon, Footer, Header, Sidebar, SocialLinks, Alert, Loading, JobSearch
};

export type {
    ThemeType,
    JobSearchPropTypes
};
