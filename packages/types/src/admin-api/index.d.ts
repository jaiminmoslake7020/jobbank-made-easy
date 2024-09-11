export type ExampleResponseType = {
    message: string;
};
export type ErrorType = {
    message: string;
    error?: any;
};
export type LocationObjectType = {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
};
export type WageObjectType = {
    currency?: string;
    minValue?: number;
    unitText?: 'HOUR' | 'MONTH' | string;
    workHours?: string;
    maxValue?: number;
};
export type HowToApplyResponseType = {
    email: string;
    lastDateToApply: string;
    requiredItems: string[];
    additionalQuestions: string[];
};
export type CompanyDetailsType = {
    companyName: string;
    companyWebsite?: string;
    industryName?: string;
    companyType?: string;
    numberOfLocations?: number;
};
export type JobDetailsType = {
    title: string;
    jobLocation: LocationObjectType;
    jobPostedOn: string;
    companyName: string;
    jobBankId: string;
    vacancies: number;
    wageObject: WageObjectType;
    employmentType: string;
    jobSituation: string;
};
export type JobDetailsAllType = JobDetailsType & HowToApplyResponseType & {
    companyData: CompanyDetailsType;
} & {
    jobLinkUrl: string;
    jobbank_link_id: number;
    is_lmia: boolean;
} & {
    job_id?: number | ErrorType;
    query?: boolean;
};
export type SearchJobType = {
    jobLinkId: string;
    isLmia: boolean;
    jobSearchResultId?: number | ErrorType;
};
export type JobSearchResultsType = {
    jobs: SearchJobType[];
    searchId: number | ErrorType;
};
//# sourceMappingURL=index.d.ts.map