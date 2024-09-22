import React from 'react';
import { FaIcon } from '../FaIcon/FaIcon';
import './footer.scss';
import {SocialLinks, SocialLinkType} from '../SocialiLinks/SocialLinks';

export const WebsiteInfo = () => {
    return <div className={"website-info"}>
        <p><span>Built with&nbsp;</span><FaIcon icon={"heart"} className={""} /><span>&nbsp;in Vancouver, BC.</span></p>
    </div>
}

export type FooterPropTypes = {
    nav?: React.JSX.Element,
    socialLinks?: SocialLinkType[]
};

export const Footer = (props: FooterPropTypes) => {
    const { nav, socialLinks } = props;
    return (
        <footer className={"main-footer"}>
            <WebsiteInfo />
            <div className={"nav-wrapper-footer"}>
                {nav}
            </div>
            <div className={"social-media-links-wrapper"}>
                { socialLinks && <SocialLinks socialLinks={socialLinks} /> }
            </div>
        </footer>
    );
}

