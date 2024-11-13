import React from 'react';
import MainContent from '../../src/components/MainContent/MainContent';
import CompanyCreate from '../../src/components/app/Company/Create/CompanyCreate';

export type IndexPropTypes = {

};

const Index = (props: IndexPropTypes) => {
    const {} = props;
    return (
        <MainContent pageNameClass={"company-create-page authenticated-page"} >
            <CompanyCreate />
        </MainContent>
    );
}

export default Index;
