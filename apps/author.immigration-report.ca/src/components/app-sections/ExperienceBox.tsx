import React, {useContext } from 'react';
import Image from 'next/image';
import {Button, CloseButton, ModalsContext} from 'ui';
import {ModalFooterWrapper, ModalHeader} from 'ui/components/Base/Modal';

export type ExperienceBoxPropTypes = {
    companyName: string,
    location: string,
    duration: string,
    jobTitle: string,
    companyLogo: string,
    companyLink: string,
    companyLogoAppearance: string
};

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
                             modalHeader: <ModalHeader onCloseClick={() => {
                                 removeModal(modalKey);
                             }} title={jobTitle+' at '+companyName} />,
                             modalFooter: <ModalFooterWrapper>
                                 <Button size={"md"} onClick={() => {
                                     removeModal(modalKey);
                                 }} >Close</Button>
                             </ModalFooterWrapper>,
                             modalBody: <div className={"flex flex-col gap-4 text-bkg p-4"}>
                                 <div className={"job-title text-bkg"}>
                                     <h4>{jobTitle} pp</h4>
                                 </div>
                                 <div className={"duration text-bkg"}>
                                     <p>{duration}</p>
                                 </div>
                                 <div className={"companyName text-bkg"}>
                                     <p>{companyName} - {location}</p>
                                 </div>
                                 <div className={`company-logo max-w-[200px] ${companyLogoAppearance} `}>
                                     <a rel="noreferrer" href={companyLink} target={"_blank"} >
                                         <Image src={companyLogo}  alt={companyName} />
                                     </a>
                                 </div>
                             </div>
                         });
                     }}
                >
                    <div className={"job-title"}>
                        <h4>{jobTitle} pp</h4>
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
