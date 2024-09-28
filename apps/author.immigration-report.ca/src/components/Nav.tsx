import React, {useCallback, useContext, useEffect} from 'react';
import {MenuLinkType} from '../types';
import {Button, FaIcon, ModalsContext} from 'ui';
import {ModalFooterWrapper} from 'ui/components/Base/Modal';
import DownloadLink from 'ui/components/Base/DownloadLink/DownloadLink';
import {inDevEnvironment} from '../utils/utils';

export type NavPropTypes = {
    showSidebar?: Function,
    menuLinks: MenuLinkType[]
};

const ResumeObject = {
  link: "https://s3.us-west-2.amazonaws.com/media-author.immigration-report.ca/Resume_Jaimin_Pandya_September_2024.pdf",
  name: "Resume_Jaimin_Pandya_September_2024.pdf"
};

const Nav = ({showSidebar, menuLinks}: NavPropTypes) => {

    const {
        addModal, removeModal
    } = useContext(ModalsContext);

    const moveContent = useCallback((content:string) => {
        const item = document.querySelector('.section.section-'+content);
        if (item) {
            item.scrollIntoView({ behavior: 'smooth' });
            if (showSidebar) {
                showSidebar(false);
            }
        }
    }, [showSidebar])

    useEffect(() => {
        const handleWindowLoad = () => {
            const hash = window.location.hash.replaceAll("#", "");
            moveContent(hash);
        };

        // Add the event listener for window load
        window.addEventListener('load', handleWindowLoad);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('load', handleWindowLoad);
        };
    }, [moveContent]);

    return (
        <nav className={"nav nav-main"}>
            {
                menuLinks.map(({label, content}) => <a key={label} href={content} className={"nav-link"}
                    onClick={(e) => {
                        e.preventDefault();
                        moveContent(content);
                    }}
                >{label}</a>)
            }
            <DownloadLink
                className={"nav-link"}
                onDownloadComplete={() => {
                    if (window && !inDevEnvironment) {
                        // @ts-ignore
                        window.dataLayer = window.dataLayer || [];
                        // @ts-ignore
                        window.dataLayer.push({
                            event: 'download_resume',
                            buttonId: ResumeObject.link, // Custom data, can be anything you want to track
                            buttonText: ResumeObject.name
                        });
                        console.log('GTM event pushed');
                    }

                const modalKey = 'thanksModal';
                addModal({
                    removeModal: removeModal,
                    isOpen: true, modalKey: modalKey, modalZIndex: 100,
                    modalFooter: <ModalFooterWrapper>
                        <Button size={"md"} onClick={() => {
                            removeModal(modalKey);
                        }} >Close</Button>
                    </ModalFooterWrapper>,
                    modalBody: <div className={"flex flex-col items-center justify-center gap-8 text-content p-8 min-w-[100dvw] md:min-w-[640px] lg:min-w-[768px] "}>
                        <div className={"job-title text-green-500 text-8xl "}>
                            <FaIcon icon={"check"} />
                        </div>
                        <div className={` text-lg `}>
                            <p>Thank you for downloading my resume.</p>
                        </div>
                    </div>,
                    hasFireworksBg: true
                });
            }}
                fileName={ResumeObject.name}
                link={ResumeObject.link}
            />
        </nav>
    );
}




export default Nav;
