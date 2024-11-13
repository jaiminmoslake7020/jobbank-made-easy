import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import ControlGroup from '../../../base/ControlGroup';
import ControlGroupSelect from '../../../base/ControlGroupSelect';
import {useGetFormCreateDataQuery} from '../../../../store/services/api';
import AdditionalActions from './AdditionalActions';
import {NewJobApplicationFormContext} from '../../../../contexts/NewJobApplicationFormProvider';
import {JobResponseTypeList} from './JobResponseTypeList';
import {FormObjectType} from '../../../../types/app';

const JobApplicationCreate = () => {

    const {
        data, isFetching, isLoading, isError, isSuccess, error
    } = useGetFormCreateDataQuery('');

    const {
        setAllCompanies, companies: companiesData
    } = useContext(NewJobApplicationFormContext);

    const {
        companies, interviewTypes, jobApplicationMediums, jobPresenceTypes, jobResponseTypes, jobSources, jobTypes
    } = data || {};

    const jobApplicationMediumOptions = useMemo(
        () => (jobApplicationMediums || []).map(({id, name}) => ({label: name, value: id})),
        [jobApplicationMediums]
    );

    const companyOptions = useMemo(
        () => (companiesData || []).map(({id, name}) => ({label: name, value: id})),
        [companiesData]
    );

    const interviewTypeOptions = useMemo(
        () => (interviewTypes || []).map(({id, name}) => ({label: name, value: id})),
        [interviewTypes]
    );

    const interviewTypeHashMap = useMemo(
        () => {
            const object = {} as Record<string, string>;
            (interviewTypes || []).forEach(({id, name}) => {
                object[id] = name;
            })
            return object;
        },
        [interviewTypes]
    );

    const jobPresenceTypeOptions = useMemo(
        () => (jobPresenceTypes || []).map(({id, name}) => ({label: name, value: id})),
        [jobPresenceTypes]
    );

    const jobResponseTypeOptions = useMemo(
        () => (jobResponseTypes || []).map(({id, name}) => ({label: name, value: id})),
        [jobResponseTypes]
    );

    const jobResponseTypeHashMap = useMemo(
        () => {
            const object = {} as Record<string, string>;
            (jobResponseTypes || []).forEach(({id, name}) => {
                object[id] = name;
            })
            return object;
        },
        [jobResponseTypes]
    );

    const jobSourceOptions = useMemo(
        () => (jobSources || []).map(({id, name}) => ({label: name, value: id})),
        [jobSources]
    );

    const jobTypeOptions = useMemo(
        () => (jobTypes || []).map(({id, name}) => ({label: name, value: id})),
        [jobTypes]
    );

    const [formObject, setFormObject] = useState<FormObjectType>({
        jobLink: {
            value: '',
            feedback: null,
        },
        jobTitle: {
            value: '',
            feedback: null,
        },
        salary: {
            value: '',
            feedback: null,
        },
        salaryType: {
            value: '',
            feedback: null,
        },
        applicationDate: {
            value: '',
            feedback: null,
        },
        postedDate: {
            value: '',
            feedback: null,
        },
        jobSourceId: {
            value: '',
            feedback: null,
        },
        jobApplicationMediumId: {
            value: '',
            feedback: null,
        },
        jobTypeId: {
            value: '',
            feedback: null,
        },
        sameAsCompanyAddress: {
            value: '',
            feedback: null,
        },
        addressId: {
            value: '',
            feedback: null,
        },
        jobPresenceTypeId: {
            value: '',
            feedback: null,
        },
        companyJobCode: {
            value: '',
            feedback: null,
        },
        companyId: {
            value: '',
            feedback: null,
        },
        jobApplicationResponses: {
            value: [],
            feedback: null,
        }
    });

    useEffect(() => {
        if (isSuccess && companies && companies.length > 0) {
            setAllCompanies(companies);
        }
    }, [companies, isSuccess, setAllCompanies])

    const handleFormObjectChange = useCallback(( key: string, keyValueObject: any ) => {
        setFormObject(  prevState => ({
            ...prevState,
            [key] : keyValueObject
        }));
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError && error) {
        // @ts-ignore
        return <p>Error: {error?.message}</p>;
    }

    if (isFetching) {
        return <p>Updating data...</p>;
    }

    return (
        <div className={"job-application-create w-container justify-center flex flex-col "}>
            <div className={"flex flex-row gap-4 justify-end w-full"}>
                <AdditionalActions />
            </div>
            <form className="job-application-create__form form  " onSubmit={ async (e) => {
                e.preventDefault();
            }}>
                <div className={"flex flex-row gap-4 justify-between"}>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Job Application</h2>
                </div>
                <div className={"group-holder"}>
                    <ControlGroup inputObject={{
                        id: 'jobTitle',
                        name: 'jobTitle',
                        type: 'text',
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Enter Job Title",
                    }}
                                  labelObject={{
                                      className: " job-application-create__label ",
                                      text: 'Job Title'
                                  }}
                                  feedbackObject={{
                                      className: "  job-application-create__feedback "
                                  }}
                                  formObjectKeyValue={formObject.jobTitle}
                                  handleFormObjectChange={handleFormObjectChange}
                    />

                    <ControlGroupSelect inputObject={{
                        id: 'jobTypeId',
                        name: 'jobTypeId',
                        options: jobTypeOptions,
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Select Job Type",
                    }}
                                        labelObject={{
                                            className: " job-application-create__label ",
                                            text: 'Job Type'
                                        }}
                                        feedbackObject={{
                                            className: "  job-application-create__feedback "
                                        }}
                                        formObjectKeyValue={formObject.jobTypeId}
                                        handleFormObjectChange={handleFormObjectChange}
                    />
                </div>

                <div className={"group-holder"}>

                    <ControlGroupSelect inputObject={{
                        id: 'jobPresenceTypeId',
                        name: 'jobPresenceTypeId',
                        options: jobPresenceTypeOptions,
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Select Job Presence Type",
                    }}
                                        labelObject={{
                                            className: " job-application-create__label ",
                                            text: 'Job Presence Type'
                                        }}
                                        feedbackObject={{
                                            className: "  job-application-create__feedback "
                                        }}
                                        formObjectKeyValue={formObject.jobTypeId}
                                        handleFormObjectChange={handleFormObjectChange}
                    />




                    <ControlGroup inputObject={{
                        id: 'jobLink',
                        name: 'jobLink',
                        type: 'text',
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Enter Job Link",
                    }}
                                  labelObject={{
                                      className: " job-application-create__label ",
                                      text: 'Job Link'
                                  }}
                                  feedbackObject={{
                                      className: "  job-application-create__feedback "
                                  }}
                                  formObjectKeyValue={formObject.jobLink}
                                  handleFormObjectChange={handleFormObjectChange}
                    />

                </div>

                <div className={"group-holder"}>

                    <ControlGroup inputObject={{
                        id: 'companyJobCode',
                        name: 'companyJobCode',
                        type: 'text',
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Enter Job Company Code",
                    }}
                                  labelObject={{
                                      className: " job-application-create__label ",
                                      text: 'Job Company Code'
                                  }}
                                  feedbackObject={{
                                      className: "  job-application-create__feedback "
                                  }}
                                  formObjectKeyValue={formObject.companyJobCode}
                                  handleFormObjectChange={handleFormObjectChange}
                    />

                    <ControlGroupSelect inputObject={{
                        id: 'companyId',
                        name: 'companyId',
                        options: companyOptions,
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Select",
                    }}
                                        labelObject={{
                                            className: " job-application-create__label ",
                                            text: 'Company'
                                        }}
                                        feedbackObject={{
                                            className: "  job-application-create__feedback "
                                        }}
                                        formObjectKeyValue={formObject.companyId}
                                        handleFormObjectChange={handleFormObjectChange}
                    />

                </div>

                <div className={"group-holder"}>

                    <ControlGroup inputObject={{
                        id: 'salary',
                        name: 'salary',
                        type: 'text',
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Enter Salary",
                    }}
                                  labelObject={{
                                      className: " job-application-create__label ",
                                      text: 'Salary'
                                  }}
                                  feedbackObject={{
                                      className: "  job-application-create__feedback "
                                  }}
                                  formObjectKeyValue={formObject.salary}
                                  handleFormObjectChange={handleFormObjectChange}
                    />

                    <ControlGroupSelect inputObject={{
                        id: 'salaryType',
                        name: 'salaryType',
                        options: [{
                            label: 'Hourly',
                            value: 'HOURLY'
                        },
                            {
                                label: 'Monthly',
                                value: 'MONTHLY'
                            },
                            {
                                label: 'Annually',
                                value: 'ANNUALLY'
                            }
                        ],
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Enter Salary Type",
                    }}
                                        labelObject={{
                                            className: " job-application-create__label ",
                                            text: 'Salary Type'
                                        }}
                                        feedbackObject={{
                                            className: "  job-application-create__feedback "
                                        }}
                                        formObjectKeyValue={formObject.salaryType}
                                        handleFormObjectChange={handleFormObjectChange}
                    />

                </div>

                <div className={"group-holder"}>

                    <ControlGroup inputObject={{
                        id: 'applicationDate',
                        name: 'applicationDate',
                        type: 'date',
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Enter Applicable Date",
                    }}
                                  labelObject={{
                                      className: " job-application-create__label ",
                                      text: 'Application Date'
                                  }}
                                  feedbackObject={{
                                      className: "  job-application-create__feedback "
                                  }}
                                  formObjectKeyValue={formObject.applicationDate}
                                  handleFormObjectChange={handleFormObjectChange}
                    />

                    <ControlGroup inputObject={{
                        id: 'postedDate',
                        name: 'postedDate',
                        type: 'date',
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Enter Job Posted Date",
                    }}
                                  labelObject={{
                                      className: " job-application-create__label ",
                                      text: 'Job Posted Date'
                                  }}
                                  feedbackObject={{
                                      className: "  job-application-create__feedback "
                                  }}
                                  formObjectKeyValue={formObject.postedDate}
                                  handleFormObjectChange={handleFormObjectChange}
                    />

                </div>

                <div className={"group-holder"}>

                    <ControlGroupSelect inputObject={{
                        id: 'jobSourceId',
                        name: 'jobSourceId',
                        options: jobSourceOptions,
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Select Job Source",
                    }}
                                        labelObject={{
                                            className: " job-application-create__label ",
                                            text: 'Job Source'
                                        }}
                                        feedbackObject={{
                                            className: "  job-application-create__feedback "
                                        }}
                                        formObjectKeyValue={formObject.jobSourceId}
                                        handleFormObjectChange={handleFormObjectChange}
                    />

                    <ControlGroupSelect inputObject={{
                        id: 'jobApplicationMediumId',
                        name: 'jobApplicationMediumId',
                        options: jobApplicationMediumOptions,
                        isRequired: true,
                        className: " job-application-create__input ",
                        placeholder: "Select Job Application Medium",
                    }}
                                        labelObject={{
                                            className: " job-application-create__label ",
                                            text: 'Job Application Medium'
                                        }}
                                        feedbackObject={{
                                            className: "  job-application-create__feedback "
                                        }}
                                        formObjectKeyValue={formObject.jobApplicationMediumId}
                                        handleFormObjectChange={handleFormObjectChange}
                    />

                </div>

                <JobResponseTypeList
                    jobResponseTypeOptions={jobResponseTypeOptions}
                    interviewTypeOptions={interviewTypeOptions}
                    formObjectKeyValue={formObject.jobApplicationResponses}
                    handleFormObjectChange={handleFormObjectChange}
                    interviewTypeHashMap={interviewTypeHashMap}
                    jobResponseTypeHashMap={jobResponseTypeHashMap}
                />

                <div className={"control-group-btn-row"}>
                    <button
                        type="submit"
                        className=" control-group-btn-row__button "
                    >
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
}

export default JobApplicationCreate;
