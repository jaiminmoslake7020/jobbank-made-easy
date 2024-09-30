import React, {useCallback, useContext} from 'react';
import {Badge, Button, FaIcon, IconButton, ModalsContext} from 'ui';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import {ProjectBoxPropTypes} from '../../types';
import {ModalFooterWrapper, ModalHeader} from 'ui/components/Base/Modal';


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
        projectPoints,
        techStack,
    } = props;

    const {
        addModal, removeModal
    } = useContext(ModalsContext);

    const showExperienceModal = useCallback(() => {
        console.log("setShowModal");
        const modalKey = 'project-box-' + projectName.replaceAll(" ", "-");
        addModal({
            isOpen: true,
            modalKey: modalKey,
            modalStyleClass: 'project-modal',
            modalZIndex: 0,
            removeModal: removeModal,
            modalHeader: <ModalHeader onCloseClick={() => {
                removeModal(modalKey);
            }} title={projectName}/>,
            modalFooter: <ModalFooterWrapper>
                <Button size={"md"} onClick={() => {
                    removeModal(modalKey);
                }}>Close</Button>
                {
                    Array.isArray(projectUrl) ?
                        <>
                            {projectUrl.map(({icon, url}: {icon:IconProp, url:string}) => {
                                return <IconButton icon={["fab",icon]} label={icon as string} colorType={"type-2"} size={"md"} onClick={() => {
                                    window.open(url, '_blank');
                                }} />
                            })}
                        </>
                        : <Button colorType={"type-2"} size={"md"} onClick={() => {
                            window.open(projectUrl, '_blank');
                        }}>
                            Visit
                        </Button>
                }
            </ModalFooterWrapper>,
            modalBody: <div className={" project-modal-body "}>
                <div className={" project-modal-body-child "}>
                    <div className={"info-wrapper"}>
                        <div className={"info-item"}>
                            <h4>
                                <FaIcon icon={"building"}/>
                                <span>{companyName}</span>
                            </h4>
                        </div>
                    </div>
                    <div className={"logo-wrapper"}>
                        {
                            !Array.isArray(projectUrl) &&
                          <div className={`company-logo ${logoAppearance} `}>
                            <Image src={projectLogo} alt={companyName}/>
                          </div>
                        }
                    </div>
                </div>
                <div className={"details-wrapper"}>
                    <div className={"tech-stack-wrapper"}>
                        {techStack.split(",").map(x => <Badge key={"tech-stack-"+x} className={" badge inverse "} >{x.trim()}</Badge>)}
                    </div>
                    <ul>
                        {projectPoints.map((str, i) => <li key={"projectPoints-" + i}><span>{str}</span></li>)}
                    </ul>
                </div>
            </div>
        });
    }, [projectName, addModal, removeModal, projectUrl, companyName, logoAppearance, techStack, projectPoints]);

    return (
        <div className={"project-box-wrapper group  "}>
            <div role={"button"} className={"project-box "} onClick={showExperienceModal} >
                <div className={`project-logo group-hover:bg-bkg group-hover:text-content ${logoAppearance} ${Array.isArray(projectUrl) ? 'is-array' : ''} `}>
                    {
                        Array.isArray(projectUrl) ?
                            <>
                                {projectUrl.map(({icon, url}: {icon:IconProp, url:string}) => {
                                    return <div className={"divA"} >
                                        <FaIcon icon={["fab",icon] as IconProp} />
                                    </div>
                                })}
                            </>
                            : <div className={"divA"} >
                                <Image src={projectLogo}  alt={projectName} />
                            </div>
                    }
                </div>
                <div className={"project-name"}>
                    <h4>{projectName}</h4>
                </div>
                <div className={"project-url"}>
                    <p>{!Array.isArray(projectUrl) ? <span>{projectUrl}</span> : "App Store"}</p>
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
