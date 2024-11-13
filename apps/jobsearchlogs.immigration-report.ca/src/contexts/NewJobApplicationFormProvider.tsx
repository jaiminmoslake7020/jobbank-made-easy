import React, {createContext, useCallback, useState} from 'react';

export type CompanyType = {
    id: number,
    name: string
};

export type JobResponseType = {

};

export interface NewJobApplicationFormProviderContextType {
    companies: CompanyType[];  // User could be null if not authenticated
    addCompany: (newCompany: CompanyType) => void; // Function to update the user
    setAllCompanies: (data: CompanyType[]) => void;
    jobResponseTypes: JobResponseType[];  // User could be null if not authenticated
    addJobResponseType: (newJobResponseType: JobResponseType) => void; // Function to update the user
}

// Create the context
export const NewJobApplicationFormContext: React.Context<NewJobApplicationFormProviderContextType> = createContext(null);

// Create a provider component
export const NewJobApplicationFormContextProvider = ({ children }) => {

    const [companies, setCompanies] = useState<CompanyType[]>([]);
    const [jobResponseTypes, setJobResponseTypes] = useState<JobResponseType[]>([]);

    const addCompany = useCallback((newCompany: CompanyType) => {
        setCompanies(prev => ([...prev, newCompany]))
    }, [setCompanies])

    const addJobResponseType = useCallback((newJobResponseType: JobResponseType) => {
        setJobResponseTypes(prev => ([...prev, newJobResponseType]))
    }, [setJobResponseTypes])

    const setAllCompanies = useCallback((data: CompanyType[]) => {
        setCompanies(data);
    },[setCompanies])

    return (
        <NewJobApplicationFormContext.Provider value={{ companies, addCompany, setAllCompanies, jobResponseTypes, addJobResponseType }}>
            {children}
        </NewJobApplicationFormContext.Provider>
    );
};

