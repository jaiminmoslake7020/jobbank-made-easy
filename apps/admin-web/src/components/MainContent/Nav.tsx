import React from 'react';
import Link from 'next/link';

export type MenuLinkType = {
    label: string,
    href: string
};

export type NavPropTypes = {
    showSidebar?: Function,
    menuLinks: MenuLinkType[]
};

const Nav = ({showSidebar, menuLinks}: NavPropTypes) => {
    return (
        <nav className={"nav nav-main"}>
            {
                menuLinks.map(({label, href}) => <Link key={label} href={href} className={"nav-link"}>{label}</Link>)
            }
        </nav>
    );
}




export default Nav;
