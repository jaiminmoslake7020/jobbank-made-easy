import React from 'react';
import Link from 'next/link';

const JobApplicationList = () => {
    return (
        <div className={"job-application-list"}>
            <div className={"job-application-list__button-row"}>
                <Link href={'/company'} className={"btn btn-primary"} >List All Companies</Link>
                <Link href={'/company/create'} className={"btn btn-primary"} >Add New Company</Link>
                <Link href={'/job-application/create'} className={"btn btn-primary"} >Add New Job Application</Link>
            </div>
        </div>
    );
}

export default JobApplicationList;
