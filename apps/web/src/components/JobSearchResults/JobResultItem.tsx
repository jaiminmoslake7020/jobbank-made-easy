import React from 'react';

export type JobResultItemPropTypes = {
    jobLinkId: string,
    isLmia: boolean
};

const JobResultItem = (props: JobResultItemPropTypes) => {
    const {
        jobLinkId,
        isLmia
    } = props;
    return (
        <div className={"job-result-item-container"}>
            <h1>{jobLinkId} and LMIA: {isLmia ? 'true' : false}</h1>
        </div>
    );
}

export default JobResultItem;
