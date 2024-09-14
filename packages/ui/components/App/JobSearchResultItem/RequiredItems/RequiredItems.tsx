import { Badge } from '../../../Base';
import React from 'react';
import './required-items.scss';

export type RequiredItemsPropTypes = {
    requiredItems?: string[]
};

export const RequiredItems = (props: RequiredItemsPropTypes) => {
    const {
        requiredItems,
    } = props;

    return (requiredItems && Array.isArray(requiredItems) && requiredItems.length > 0 ?
        <div className={"required-items-wrapper"}>
            <h4>Required Items</h4>
            <div className={" required-items-container "}>
                {
                    requiredItems.map((r) => <Badge key={r} >{r}</Badge>)
                }
            </div>
        </div>
        : <></>)
}
