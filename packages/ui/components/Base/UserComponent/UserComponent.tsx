import React from 'react';
import './user-component.scss';
import Dropdown from '../Dropdown/Dropdown';
import {FaIcon} from '../FaIcon/FaIcon';

export type UserComponentPropTypes = {
    user?: {
        name: string,
        email: string
    },
    loginHref?: string
    onLogin?: Function,
    onLogout?: Function
};

export type UserRoundbyNamePropTypes = {
    user: {
        name: string,
        email: string
    },
    onLogout: Function
};


const UserRoundByName = (props: UserRoundbyNamePropTypes) => {
    const {
        user,
        onLogout
    } = props;
    const {name, email} = user;
    const nameChar = name.trim().split(' ').map((x) => x.slice(0, 1).toUpperCase()).join('');
    return (
        <Dropdown dropDownData={
            <div className={"user-component-dropdown"}>
                <div className={"user-component-item name normal"}>
                    <FaIcon icon={"user"} />
                    <p className={""} >{name}</p>
                </div>
                <div className={"user-component-item normal"}>
                    <p>{email}</p>
                </div>
                <div className={"user-component-item with-btn"}>
                    <button className={"log-out-btn"} type={"button"} onClick={() => {
                        onLogout();
                    }}>
                        <FaIcon icon={"power-off"} />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        } dropDownTextDiv={<div className={"user-component-round"}>
            <p>{nameChar}</p>
        </div>}
                  dropDownDataId={'user-component-dropdown'}
        />
    );
}

const UserComponent = (props: UserComponentPropTypes) => {
    const {
        user,
        loginHref,
        onLogout
    } = props;
    const {name, email} = user || {};
    return (
        <div className={"user-component"}>
            {
                user && onLogout ? <UserRoundByName user={user} onLogout={onLogout} /> : <a href={loginHref} className={"btn"} >Login</a>
            }
        </div>
    );
}

export default UserComponent;
