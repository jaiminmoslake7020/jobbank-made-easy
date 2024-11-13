import React from 'react';
import MainContent from '../../src/components/MainContent/MainContent';
import { CompanyList } from '../../src/components/app/Company/List/CompanyList';

export type IndexPropTypes = {

};

const Index = (props: IndexPropTypes) => {
    const {} = props;
    return (
        <MainContent pageNameClass={"company-index-page authenticated-page"} >
            <CompanyList />
        </MainContent>
    );
}

export default Index;
