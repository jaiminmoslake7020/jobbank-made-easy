import React from 'react';
import { FaIcon } from 'ui';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';

export type ProjectBoxPropTypes = {
    projectName: string,
    companyName: string,
    projectUrl: {
        icon: IconProp,
        url: string
    }[] | string,
    projectTech: string,
    projectLogo: string,
    logoAppearance: string
};

export type ProjectBoxEmptyPropTypes = {
    setShowMore: Function,
    showMore: boolean,
};

export const ProjectBoxEmpty = (props: ProjectBoxEmptyPropTypes) => {
    const {
        setShowMore, showMore
    } = props;
    return (
        <div className={"project-box-wrapper"}>
            <div className={"project-box empty-box "}>
                <button type={"button"} onClick={() => {
                    setShowMore(!showMore);
                }}>{showMore ? "Show Less" : "Show More"}</button>
            </div>
        </div>
    );
}

const ProjectBox = (props: ProjectBoxPropTypes) => {
    const {
        projectName,
        companyName,
        projectUrl,
        projectTech,
        projectLogo,
        logoAppearance,
    } = props;

    return (
        <div className={"project-box-wrapper group  "}>
            <div className={"project-box "}>
                <div className={`project-logo group-hover:bg-bkg group-hover:text-content ${logoAppearance} ${Array.isArray(projectUrl) ? 'is-array' : ''} `}>
                    {
                        Array.isArray(projectUrl) ?
                            <>
                                {projectUrl.map(({icon, url}: {icon:IconProp, url:string}) => {
                                    return <a key={icon as string} rel="noreferrer" href={url} target={"_blank"} >
                                        <FaIcon icon={["fab",icon] as IconProp} />
                                    </a>
                                })}
                            </>
                            : <a rel="noreferrer" href={projectUrl} target={"_blank"} >
                                <Image src={projectLogo}  alt={projectName} />
                            </a>
                    }
                </div>
                <div className={"project-name"}>
                    <h4>{projectName}</h4>
                </div>
                <div className={"project-url"}>
                    <p>{!Array.isArray(projectUrl) ? <a rel="noreferrer" href={"projectUrl"}>{projectUrl}</a> : "App Stores"}</p>
                </div>
                <div className={"company-name"}>
                    <p>{companyName}</p>
                </div>
                <div className={"project-tech"}>
                    <p>{projectTech}</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectBox;
