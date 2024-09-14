import React from 'react';
import {WageObjectkeyType, WageObjectType} from 'types';

export type JobWagePropTypes = {
    wageObject: WageObjectType
};

export type JobWageValueType = {
    property: WageObjectkeyType
    value?: string | number
};

export const JobWageValue = (props: JobWageValueType) => {
    const {
        property,
        value
    } = props;
    return value && <span key={property} property={property}>
            {value}
          </span>
}

export const JobWage = (props: JobWagePropTypes) => {
    const {
        wageObject
    } = props;
    const wageObjectkeys = Object.keys(wageObject) as WageObjectkeyType[];
    return ( wageObject ?
        <p className={"job-wage-wrapper"}>
            <span>Wage</span>
            {wageObjectkeys.map((property: WageObjectkeyType) => (
                    <JobWageValue key={property} property={property} value={wageObject[property as WageObjectkeyType]} />
                ))}
        </p> : null
    );
}

export default JobWage;
