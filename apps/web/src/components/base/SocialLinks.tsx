import React, { useRef, useState } from 'react';
import FaIcon from './FaIcon';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

export type SocialLinksPropTypes = {

};

export type TooltipType = {
    title: string,
    content: string
};

const Arrow = () => {
    return   <div className={"w-full flex justify-center h-4"}>
        <div className={"relative w-4 "}>
            <div className={"absolute top-0 left-2 w-8 h-4 bg-bkg z-20 "}></div>
            <div className={"absolute top-2 left-4 w-4 h-4 z-10 bg-content rotate-45 "}></div>
        </div>
    </div>
}


const Tooltip = (props : {
    tooltip: TooltipType,
    active: boolean
}) => {
    const {tooltip, active} = props;
    const { title, content } = tooltip;
    const divRef = useRef<HTMLDivElement>(null);
    const width = divRef.current?.getBoundingClientRect().width || undefined;
    const height = divRef.current?.getBoundingClientRect().height || undefined;
    return <div ref={divRef} className={`hidden absolute min-w-64 h-fit top-10 opacity-0 border-content border-2 md:group-hover:flex flex-col gap-0 group-hover:opacity-100 transition-opacity overflow-visible item-${active}`}
        style={ width && height ? {
            top: (-1 * (height + 20))+"px",
            left: (-1 * ((width / 2) + 10))+"px",
        } : {
            left: "-8.5rem",
            top: "-12rem"
        }}
    >
        <h2 className={" p-4 text-bkg bg-content font-bold "}>{title}</h2>
        <p className={" pt-4 px-4 bg-bkg text-content "}>{content}</p>
        <Arrow />
    </div>
}

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
] as {
    label: string,
    link: string,
    icon: IconProp,
    tooltip?: TooltipType
}[];

const SocialLinks = (props: SocialLinksPropTypes) => {

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

export default SocialLinks;
