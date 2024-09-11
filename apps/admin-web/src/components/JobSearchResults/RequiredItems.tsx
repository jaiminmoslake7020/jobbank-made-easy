import {Badge} from 'ui';
import React from 'react';

export type RequiredItemsPropTypes = {
    requiredItems?: string[]
};

const RequiredItems = (props: RequiredItemsPropTypes) => {
    const {
        requiredItems,
    } = props;

    return (requiredItems && Array.isArray(requiredItems) && requiredItems.length > 0 ?
        <div className={"required-items flex flex-col gap-2 mb-4"}>
            <h4>Required Items</h4>
            <div className={"flex flex-row gap-4"}>
                {
                    requiredItems.map((r) => <Badge key={r} >{r}</Badge>)
                }
            </div>
        </div>
        : <></>)
}

export default RequiredItems;
