import React, {useContext } from 'react';
import Image from 'next/image';
import {Button, ModalsContext} from 'ui';
import {ModalFooterWrapper, ModalHeader} from 'ui/components/Base/Modal';
import {ExperienceBoxPropTypes} from '../../types';

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
        companyLogoAppearance
    } = props;

    const {
        addModal, removeModal
    } = useContext(ModalsContext);

    return (
        <div className={"experience-box-wrapper group  "}>
                <div role={"button"} className={"experience-box lg:group-hover:before:animate-[shimmer_1s_forwards] "}
                     onClick={() => {
                         console.log("setShowModal");
                         const modalKey = 'experience-box-'+jobTitle.replaceAll(" ","-");
                         addModal({
                             isOpen: true,
                             modalKey: modalKey,
                             modalZIndex: 0,
                             removeModal: removeModal,
                             modalHeader: <ModalHeader onCloseClick={() => {
                                 removeModal(modalKey);
                             }} title={jobTitle} />,
                             modalFooter: <ModalFooterWrapper>
                                 <Button size={"md"} onClick={() => {
                                     removeModal(modalKey);
                                 }} >Close</Button>
                                 <Button colorType={"type-2"} size={"md"} onClick={() => {
                                     window.open(companyLink, '_blank');
                                 }} >
                                     Visit
                                 </Button>
                             </ModalFooterWrapper>,
                             modalBody: <div className={"flex flex-col gap-4 text-content p-4 min-w-[100dvw] md:min-w-[640px] lg:min-w-[768px] "}>
                                 <div className={"job-title text-content "}>
                                     <h4>{companyName}</h4>
                                 </div>
                                 <div className={"duration text-content "}>
                                     <p>{duration}</p>
                                 </div>
                                 <div className={"companyName text-content "}>
                                     <p>{location}</p>
                                 </div>
                                 <div className={`company-logo max-w-[200px] ${companyLogoAppearance} `}>
                                     <Image src={companyLogo}  alt={companyName} />
                                 </div>
                             </div>
                         });
                     }}
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
                        <a rel="noreferrer" href={companyLink} target={"_blank"} >
                            <Image src={companyLogo}  alt={companyName} />
                        </a>
                    </div>
                </div>
        </div>
    );
}

export default ExperienceBox;
