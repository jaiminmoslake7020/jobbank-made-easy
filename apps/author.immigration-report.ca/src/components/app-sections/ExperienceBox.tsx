import React, {useCallback, useContext} from 'react';
import Image from 'next/image';
import {Button, FaIcon, ModalsContext} from 'ui';
import {ModalFooterWrapper, ModalHeader} from 'ui/components/Base/Modal';
import {ExperienceBoxPropTypes} from '../../types';
import {inDevEnvironment} from '../../utils/utils';

export type ExperienceBoxEmptyPropTypes = {
    setShowMore: Function,
    showMore: boolean,
};

export const ExperienceBoxEmpty = (props: ExperienceBoxEmptyPropTypes) => {
    const {
        setShowMore, showMore
    } = props;
    return (
        <div className={"experience-box-wrapper"}>
            <div className={"experience-box empty-box "}>
                <button type={"button"} onClick={() => {
                    setShowMore(!showMore);
                }}>{showMore ? "Show Less" : "Show More"}</button>
            </div>
        </div>
    );
}

const ExperienceBox = (props: ExperienceBoxPropTypes) => {
    const {
        companyName,
        location,
        duration,
        jobTitle,
        companyLogo,
        companyLink,
        companyLogoAppearance,
        experiencePoints,
        companyInfo
    } = props;

    const {
        addModal, removeModal
    } = useContext(ModalsContext);

    const sendGTMEvent = useCallback((jobTitle, companyName ) => {
        if (window && !inDevEnvironment) {
            // @ts-ignore
            window.dataLayer = window.dataLayer || [];
            // @ts-ignore
            window.dataLayer.push({
                event: 'view_experience',
                jobTitle: jobTitle, // Custom data, can be anything you want to track
                companyName: companyName, // Custom data, can be anything you want to track
            });
            console.log('GTM event pushed');
        }
    }, []);

    const showExperienceModal = useCallback(() => {
        console.log("setShowModal");
        const modalKey = 'experience-box-' + jobTitle.replaceAll(" ", "-");
        sendGTMEvent(jobTitle, companyName);
        addModal({
            isOpen: true,
            modalKey: modalKey,
            modalStyleClass: 'experience-modal',
            modalZIndex: 0,
            removeModal: removeModal,
            modalHeader: <ModalHeader onCloseClick={() => {
                removeModal(modalKey);
            }} title={jobTitle}/>,
            modalFooter: <ModalFooterWrapper>
                <Button size={"md"} onClick={() => {
                    removeModal(modalKey);
                }}>Close</Button>
                <Button colorType={"type-2"} size={"md"} onClick={() => {
                    window.open(companyLink, '_blank');
                }}>
                    Visit
                </Button>
            </ModalFooterWrapper>,
            modalBody: <div className={" experience-modal-body "}>
                <div className={" experience-modal-body-child "}>
                    <div className={"info-wrapper"}>
                        <div className={"info-item"}>
                            <h4>
                                <FaIcon icon={"building"}/>
                                <span>{companyName}</span>
                            </h4>
                        </div>
                        <div className={"info-item"}>
                            <p>
                                <FaIcon icon={"calendar-days"}/>
                                <span>{duration}</span>
                            </p>
                        </div>
                        <div className={"info-item"}>
                            <p>
                                <FaIcon icon={"location-dot"}/>
                                <span>{location}</span>
                            </p>
                        </div>
                    </div>
                    <div className={"logo-wrapper"}>
                        <div className={`company-logo ${companyLogoAppearance} `}>
                            <Image src={companyLogo} alt={companyName}/>
                        </div>
                    </div>
                </div>
                <div className={"details-wrapper"}>
                    <p>
                        {companyInfo}
                    </p>
                    <ul>
                        {experiencePoints.map((str, i) => <li key={"experiencePoints-" + i}>
                            <span>{str}</span>
                        </li>)}
                    </ul>
                </div>
            </div>
        });
    }, [jobTitle, sendGTMEvent, companyName, addModal, removeModal, duration, location, companyLogoAppearance, companyLogo, companyInfo, experiencePoints, companyLink]);

    return (
        <div className={"experience-box-wrapper group  "}>
            <div role={"button"} className={"experience-box lg:group-hover:before:animate-[shimmer_1s_forwards] "}
                 onClick={showExperienceModal}
            >
                <div className={"job-title"}>
                    <h4>{jobTitle}</h4>
                </div>
                <div className={"duration"}>
                    <p>{duration}</p>
                </div>
                <div className={"companyName"}>
                    <p>{companyName} - {location}</p>
                </div>
                <div className={`company-logo ${companyLogoAppearance} `}>
                    <div className={"divA"}>
                        <Image src={companyLogo} alt={companyName}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExperienceBox;
