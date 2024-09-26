import React, {useEffect, useRef, useState} from 'react';
import {useScrollY} from '../../../hooks';

const scrollActiveClassNameDefault = 'scroll-active';
const scrollActiveFirstClassNameDefault = 'scroll-active-first';

export type ScrollElementPropTypes = {
    className: string,
    children: React.ReactNode,
    scrollActiveClassName?: string,
    scrollActiveFirstClassName?: string,
};

export const ScrollElement = (props: ScrollElementPropTypes) => {
    const {
        children, className, scrollActiveClassName, scrollActiveFirstClassName
    } = props;

    const ref = useRef<null | HTMLElement>(null);
    const scrollY = useScrollY();

    const [scrollActiveFirst, setScrollActiveFirst] = useState<string>('');
    const [scrollActive, setScrollActive] = useState<string>('');

    useEffect(() => {
        if (ref && ref.current !== null) {
            const top = (ref.current as HTMLElement).getBoundingClientRect().top;
            if (window) {
                if ( window.innerHeight / 2 > top) {
                    setScrollActive(scrollActiveClassName || scrollActiveClassNameDefault);
                    setScrollActiveFirst(scrollActiveFirstClassName || scrollActiveFirstClassNameDefault);
                } else {
                    setScrollActive('');
                }
            }
        }
    },[scrollY, scrollActiveClassName, scrollActiveFirstClassName]);

    return (
        <section ref={ref} className={` ${className} ${scrollActive} ${scrollActiveFirst} `}>{children}</section>
    );
}

