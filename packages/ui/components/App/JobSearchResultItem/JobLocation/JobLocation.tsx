import React from 'react';
import {LocationObjectKeyType, LocationObjectType} from 'types';
import './job-location.scss';

export type JobLocationValueType = {
    property: LocationObjectKeyType
    value?: string
};

export type JobLocationType = {
    jobLocation: LocationObjectType
};

export const JobLocationValue = (props: JobLocationValueType) => {
    const {
        property,
        value
    } = props;
    return value && <span key={property} property={property}>
            {value}
          </span>
}

export const JobLocation = (props: JobLocationType) => {
    const { jobLocation } = props;
    const jobLocationKeys = Object.keys(jobLocation) as LocationObjectKeyType[];
    return (
        jobLocation ?
        <p className={"job-location-item "}>
            <span>Job Location</span>
            {jobLocationKeys.map((property: LocationObjectKeyType) => <JobLocationValue key={property} property={property} value={jobLocation[property as LocationObjectKeyType]} />)}
        </p> : null
    );
};
