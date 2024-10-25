import React from 'react';
import {StaticImageData} from 'next/image';
import './logo.scss';

export type LogoObjectType = {
    darkColourUrl : StaticImageData,
    lightColourUrl : StaticImageData
}

export type LogoPropTypes = {
    logoObject: LogoObjectType,
    logoUrl: string
};

export const Logo = (props: LogoPropTypes) => {
    const {
        logoObject,
        logoUrl
    } = props;
    const {
        darkColourUrl,
        lightColourUrl
    } = logoObject
    return (
        <div className={"logo"}>
            <a className={"logo-box"} href={logoUrl}>
                <img className={" logo-img light-color-image "} src={lightColourUrl.src} alt={"Logo Light"} />
                <img className={" logo-img dark-color-image "} src={darkColourUrl.src} alt={"Logo Dark"} />
            </a>
        </div>
    );
}

