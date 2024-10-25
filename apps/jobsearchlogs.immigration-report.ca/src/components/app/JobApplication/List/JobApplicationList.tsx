import React from 'react';
import Link from 'next/link';

const JobApplicationList = () => {
    return (
        <div className={"job-application-list"}>
            <div className={"job-application-list__button-row"}>
                <Link href={'/job-application/create'} className={"btn btn-primary"} >Add New</Link>
            </div>
        </div>
    );
}

export default JobApplicationList;
