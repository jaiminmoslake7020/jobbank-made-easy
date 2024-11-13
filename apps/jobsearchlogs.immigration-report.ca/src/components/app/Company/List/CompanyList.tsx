import React from 'react';
import {useListCompanyQuery} from '../../../../store/services/api';

export const CompanyList = () => {

    const {
        data, isFetching, isLoading, isError, isSuccess, error
    } = useListCompanyQuery('');

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError && error) {
        return <p>Error: {error?.message}</p>;
    }

    if (isFetching) {
        return <p>Updating data...</p>;
    }

    if (isSuccess && data) {
        return (
            <div className={"p-6 flex flex-col gap-6"}>
                <h1>Companies List</h1>
                <ul className={"flex flex-col gap-4"} >
                    {data.map((company) => (
                        <li key={company.id}>{company.name}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return null;
}


