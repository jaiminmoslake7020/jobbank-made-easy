import React, {useCallback, useContext} from 'react';
import {Badge, Button, FaIcon, IconButton, ModalsContext, ModalFooterWrapper, ModalHeader, ImageGalleryViewer} from 'ui';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import {ProjectBoxPropTypes} from '../../types';
import {inDevEnvironment} from '../../utils/utils';


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
        images
    } = props;

    const {
        addModal, removeModal
    } = useContext(ModalsContext);

    const sendGTMEvent = useCallback((projectName, eventName: 'view_project' | 'view_project_images') => {
        if (window && !inDevEnvironment) {
            // @ts-ignore
            window.dataLayer = window.dataLayer || [];
            // @ts-ignore
            window.dataLayer.push({
                event: eventName,
                projectName: projectName, // Custom data, can be anything you want to track
            });
            console.log('GTM event pushed');
        }
    }, []);

    const showImagesModal = useCallback(() => {
        const modalKey = 'project-box-images-' + projectName.replaceAll(" ", "-");
        sendGTMEvent(projectName, 'view_project_images');
        addModal({
            isOpen: true,
            modalKey: modalKey,
            modalStyleClass: 'project-images-modal',
            modalZIndex: 10,
            removeModal: removeModal,
            modalHeader: <ModalHeader onCloseClick={() => {
                removeModal(modalKey);
            }} />,
            modalBody: <div className={" project-images-modal-body "}>
                <ImageGalleryViewer images={images} />
            </div>
        });
    },[addModal, images, projectName, removeModal, sendGTMEvent]);

    const showExperienceModal = useCallback(() => {
        const modalKey = 'project-box-' + projectName.replaceAll(" ", "-");
        const hasImages = images && Array.isArray(images) && images.length > 0;
        sendGTMEvent(projectName, 'view_project');
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
                <div className={"flex flex-row flex-wrap gap-4 w-full justify-end "}>
                    <Button size={"md"} onClick={() => {
                        removeModal(modalKey);
                    }}>Close</Button>
                    {
                        hasImages && <Button colorType={"type-2"} size={"md"} onClick={showImagesModal}>
                        See Images
                      </Button>
                    }
                    {
                        Array.isArray(projectUrl) ?
                            <>
                                {projectUrl.map(({icon, url}: {icon:IconProp, url:string}) => {
                                    return <IconButton key={icon as string} icon={["fab",icon]} label={icon as string} colorType={"type-2"} size={"md"} onClick={() => {
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
                </div>
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
    }, [projectName, images, addModal, removeModal, showImagesModal, projectUrl, companyName, logoAppearance, projectLogo, techStack, projectPoints]);

    return (
        <div className={"project-box-wrapper group  "}>
            <div role={"button"} className={"project-box "} onClick={showExperienceModal} >
                <div className={`project-logo group-hover:bg-bkg group-hover:text-content ${logoAppearance} ${Array.isArray(projectUrl) ? 'is-array' : ''} `}>
                    {
                        Array.isArray(projectUrl) ?
                            <>
                                {projectUrl.map(({icon, url}: {icon:IconProp, url:string}) => {
                                    return <div key={icon as string} className={"divA"} >
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
