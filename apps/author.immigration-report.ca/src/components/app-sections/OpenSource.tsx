import React from 'react';
import {FaIcon, ScrollElement} from 'ui';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

export type OpenSourceProject = {
    title:string,
    github:string,
    website:string,
    npm:string
};

const projects = [
    {
        title: 'react-dark-light-theme-switcher',
        github: 'https://github.com/jaiminmoslake7020/react-dark-light-theme-switcher',
        website: 'https://react-dark-light-theme-switcher.netlify.app/',
        npm: 'https://www.npmjs.com/package/@jaiminmoslake7020/react-dark-light-theme-switcher'
    },
    {
        title: 'react-typing-text',
        github: 'https://github.com/jaiminmoslake7020/react-typing-text',
        website: 'https://react-typing-text.netlify.app',
        npm: 'https://www.npmjs.com/package/@jaiminmoslake7020/react-typing-text'
    },
] as OpenSourceProject[];

const OpenSourceProject = (props:OpenSourceProject) => {
    const {title, github, website, npm} = props;
    return (
        <div className={"open-source-box-wrapper"}>
            <div className={" open-source-box"}>
                <h3 className={"capitalize"}>{title.replaceAll('-', ' ')}</h3>
                <div className={"flex flex-row justify-between"}>
                    <a role={"button"} href={github} title={"github"} target={"_blank"} >
                        <FaIcon icon={['fab','github'] as IconProp} className={"text-4xl"} />
                    </a>
                    <a role={"button"} href={npm} title={"npm"} target={"_blank"} >
                        <FaIcon icon={['fab','npm'] as IconProp} className={"text-4xl"} />
                    </a>
                    <a role={"button"} href={website} title={"website"} target={"_blank"} >
                        <FaIcon icon={'globe' as IconProp} className={"text-4xl"} />
                    </a>
                </div>
            </div>
        </div>
    );
}

const OpenSource = () => {
    return (
        <ScrollElement className={"section section-open-source"} >
            <h1>Open Source</h1>
            <div className={"section-content section-open-source-content"}>
                <div className={"open-source-wrapper"}>
                    {
                        projects.map(({title, ...rest}) => {
                            return <OpenSourceProject key={title} title={title} {...rest} ></OpenSourceProject>
                        })
                    }
                </div>
            </div>
        </ScrollElement>
    );
}

export default OpenSource;
