import React, { useState } from 'react';
import { FaIcon } from '../FaIcon/FaIcon';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Tooltip,TooltipType} from '../Tooltip/Tooltip';

export type SocialLinkType = {
    label: string,
    link: string,
    icon: IconProp,
    tooltip?: TooltipType
}

export type SocialLinksPropTypes = {
    socialLinks: SocialLinkType[]
};


const socialLinks = [
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

export const SocialLinks = (props: SocialLinksPropTypes) => {

    const {
        socialLinks
    } = props;

    const [activeItem, setActiveItem] = useState<null | string>(null);

    return (
        <nav className={"social-media-links-wrapper"} >
            {
                socialLinks.map(({label, link, icon, tooltip}) => <a className={"group relative"} rel="noreferrer" key={label}  aria-label={label} target={"_blank"}
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
