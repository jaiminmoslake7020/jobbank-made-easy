import React, {useCallback, useEffect} from 'react';
import {MenuLinkType} from '../types';

export type NavPropTypes = {
    showSidebar?: Function,
    menuLinks: MenuLinkType[]
};

const Nav = ({showSidebar, menuLinks}: NavPropTypes) => {

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
    }, [moveContent])

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
            <a target="_blank" rel={"noreferrer"} className={"nav-link"} href={"https://drive.google.com/file/d/1naIm-aWJzHMyH25B7_o9vBHCeGyFTYi-/view?usp=sharing"}>Resume</a>
        </nav>
    );
}




export default Nav;
