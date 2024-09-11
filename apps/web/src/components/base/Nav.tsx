import React from 'react';
import Link from 'next/link';

export type NavPropTypes = {
    showSidebar?: Function
};

const menuLinks = [
    {
        label: "Job Search",
        href: "/",
    },
];

const Nav = ({showSidebar}: NavPropTypes) => {
    return (
        <nav className={"nav nav-main"}>
            {
                menuLinks.map(({label, href}) => <Link key={label} href={href} className={"nav-link"}>{label}</Link>)
            }
        </nav>
    );
}




export default Nav;
