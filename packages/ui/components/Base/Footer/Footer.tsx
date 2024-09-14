import React from 'react';
import { FaIcon } from '../FaIcon/FaIcon';
import './footer.scss';

export const WebsiteInfo = () => {
    return <div className={"website-info"}>
        <p>Built with <FaIcon icon={"heart"} className={"text-red-400"} /> , React & Tailwind at Vancouver, BC, Canada</p>
    </div>
}

export type FooterPropTypes = {

};

export const Footer = (props: FooterPropTypes) => {
    return (
        <footer className={"main-footer"}>
            <WebsiteInfo />
        </footer>
    );
}

