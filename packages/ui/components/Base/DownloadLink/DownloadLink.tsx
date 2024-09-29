import React from 'react';
import {ModalFooterWrapper} from '../Modal';
import {Button} from '../Button/Button';
import {FaIcon} from '../FaIcon/FaIcon';

export type DownloadLinkPropTypes = {
    onDownloadComplete?: Function,
    className?: string,
    fileName: string,
    link: string,
};

const DownloadLink = (props: DownloadLinkPropTypes) => {
    const {
        onDownloadComplete,
        className,
        fileName,
        link
    } = props;
    return (
        <a target="_blank" onClick={async (e) => {
            e.preventDefault();
            const response = await fetch(link);
            const blob = await response.blob();
            const linkTag = document.createElement("a");
            linkTag.href = window.URL.createObjectURL(blob);
            linkTag.download = fileName; // Name for the downloaded file
            linkTag.click();
            if (onDownloadComplete) {
                onDownloadComplete();
            }
        }} rel={"noreferrer"} className={className} href={"/Resume_Jaimin_Pandya_September_2024.pdf"}>Resume</a>
    );
}

export default DownloadLink;
