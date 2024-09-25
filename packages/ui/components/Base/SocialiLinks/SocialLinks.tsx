import React, { useState } from 'react';
import { FaIcon } from '../FaIcon/FaIcon';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Tooltip,TooltipType} from '../Tooltip/Tooltip';
import './styles.scss';

export type SocialLinkType = {
    label: string,
    link: string,
    icon: IconProp,
    tooltip?: TooltipType
}

export type SocialLinksPropTypes = {
    socialLinks: SocialLinkType[]
};

export const SocialLinks = (props: SocialLinksPropTypes) => {

    const {
        socialLinks
    } = props;

    const [activeItem, setActiveItem] = useState<null | string>(null);

    return (
        <nav className={"social-media-links-wrapper"} >
            {
                socialLinks.map(({label, link, icon, tooltip}) => <a className={"social-link group"} rel="noreferrer" key={label}  aria-label={label} target={"_blank"}
                    href={link}
                    onMouseOver={() => {
                        setActiveItem(label);
                    }}
                    onMouseLeave={() => {
                        setActiveItem(null);
                    }}
                >
                    {
                        tooltip ? <Tooltip tooltip={tooltip} active={label === activeItem} />: null
                    }
                    <FaIcon icon={["fab", icon] as IconProp} />
                </a>)
            }
        </nav>
    );
}
