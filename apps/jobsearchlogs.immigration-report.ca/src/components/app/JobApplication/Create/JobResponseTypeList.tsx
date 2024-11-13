import React, {useState, memo} from 'react';
import ControlGroupSelect from '../../../base/ControlGroupSelect';
import {Button, FaIcon, IconButton} from 'ui';
import {FormObjectType} from '../../../../types/app';

export type JobResponseTypePropTypes = {
    jobResponseTypeOptions: any;
    interviewTypeOptions: any;
    formObjectKeyValue: any;
    handleFormObjectChange: Function,
    interviewTypeHashMap: Record<string, string>,
    jobResponseTypeHashMap: Record<string, string>
};

export type AddJobResponseTypePropTypes = {
    jobResponseTypeOptions: any;
    interviewTypeOptions: any;
    addNew: Function,
    close: Function
};

export type JobResponseSingularTypePropTypes = {
    interviewTypeHashMap: Record<string, string>,
    jobResponseTypeHashMap: Record<string, string>
    remove: Function,
    response: any
};

export const JobResponseType = (props: JobResponseSingularTypePropTypes) => {
    const {
        interviewTypeHashMap,
        jobResponseTypeHashMap,
        remove,
        response
    } = props;

    const jobResponseType = response && response.jobResponseTypeId ?
        jobResponseTypeHashMap[response.jobResponseTypeId ]
        : null;

    const interviewType = response && response.interviewTypeId ?
        interviewTypeHashMap[response.interviewTypeId]
        : null ;
    return (
        <div className={"form-inner-box"}>
            <p className={"flex gap-2 items-center"}>
                <FaIcon icon={"bell"} />
                <span className={""} >
                    {jobResponseType}
                </span>
            </p>

            {interviewType ?
                <p className={"flex gap-2 items-center"}>
                    <FaIcon icon={"phone"} />
                    <span>{interviewType}</span>
                </p> : null}
            <div className={"flex-grow flex justify-center lg:justify-end"}>
                <IconButton colorType={"type-2"} size={"md"}
                            onClick={() => {
                                remove();
                            }}
                            icon={"trash"} >Remove</IconButton>
            </div>
        </div>
    );
}

export const AddJobResponseType = (props: AddJobResponseTypePropTypes) => {
    const {
        jobResponseTypeOptions,
        interviewTypeOptions,
        addNew,
        close
    } = props;

    const [formObjectKeyValue, setFormObjectKeyValue] = useState<FormObjectType>(
        {
            'jobResponseTypeId': {
                value: '',
                feedback: null,
            },
            'interviewTypeId': {
                value: '',
                feedback: null,
            }
        }
    );

    const isAnInterview = formObjectKeyValue && formObjectKeyValue.jobResponseTypeId && formObjectKeyValue.jobResponseTypeId.value ?
        (jobResponseTypeOptions.filter(o => o.label === "interview" && o.value === Number(formObjectKeyValue.jobResponseTypeId.value))).length === 1
        : false;

    return (
        <div className={"form-inner-box-v2"}>
            <ControlGroupSelect inputObject={{
                id: 'jobResponseTypeId',
                name: 'jobResponseTypeId',
                options: jobResponseTypeOptions,
                isRequired: true,
                className: " job-application-create__input ",
                placeholder: "Select Job Response Type",
            }}
                                labelObject={{
                                    className: " job-application-create__label ",
                                    text: 'Job Response Type'
                                }}
                                feedbackObject={{
                                    className: "  job-application-create__feedback "
                                }}
                                formObjectKeyValue={formObjectKeyValue.jobResponseTypeId}
                                handleFormObjectChange={(name, objectValue) => {
                                    console.log("objectValue", name, objectValue);
                                    setFormObjectKeyValue(prev => ({...prev, [name]: objectValue}));
                                }}
            />
            {
                isAnInterview && <ControlGroupSelect inputObject={{
                    id: 'interviewTypeId',
                    name: 'interviewTypeId',
                    options: interviewTypeOptions,
                    isRequired: true,
                    className: " job-application-create__input ",
                    placeholder: "Select Interview Type",
                }}
                                                     labelObject={{
                                                         className: " job-application-create__label ",
                                                         text: 'Interview Type'
                                                     }}
                                                     feedbackObject={{
                                                         className: "  job-application-create__feedback "
                                                     }}
                                                     formObjectKeyValue={formObjectKeyValue.interviewTypeId}
                                                     handleFormObjectChange={(name, objectValue) => {
                                                         console.log("interviewTypeId objectValue", name, objectValue);
                                                         setFormObjectKeyValue(prev => ({
                                                             ...prev,
                                                             [name]: objectValue
                                                         }));
                                                     }}
              />
            }
            <div className={"flex flex-row gap-4 "}>
                <IconButton size={"sm"}
                        onClick={() => {
                            addNew({
                                jobResponseTypeId: Number(formObjectKeyValue.jobResponseTypeId.value),
                                interviewTypeId: formObjectKeyValue.interviewTypeId.value ? Number(formObjectKeyValue.interviewTypeId.value) : null
                            });
                        }}
                        icon={"plus"}
                />
                <IconButton colorType={"type-2"} size={"sm"}
                        onClick={() => {
                            close();
                        }}
                 icon={"times"} />
            </div>
        </div>
    );
}

// eslint-disable-next-line react/display-name
export const JobResponseTypeList = memo((props: JobResponseTypePropTypes) => {
    const {
        jobResponseTypeOptions,
        interviewTypeOptions,
        formObjectKeyValue,
        handleFormObjectChange,
        jobResponseTypeHashMap,
        interviewTypeHashMap
    } = props;

    const {
        value
    } = formObjectKeyValue;

    const [addNew, setAddNew] = useState<boolean>(value.length === 0);

    console.log("value", value);

    return (
        <div className={"job-response-list w-full flex flex-col gap-4 "}>
            <div className={"flex w-full justify-between items-center"}>
                <label>Job Application Response</label>
                {
                    !addNew && <Button size={"md"} onClick={() => {
                        setAddNew(true);
                    }}>Add New Job Response</Button>
                }
            </div>
            <div className={"flex flex-col gap-4"}>
                {
                    value.map((v, index) => {
                        return <JobResponseType key={`JobResponseType-${index}`}
                                                jobResponseTypeHashMap={jobResponseTypeHashMap}
                                                interviewTypeHashMap={interviewTypeHashMap} remove={() => {
                            handleFormObjectChange('jobApplicationResponses', {
                                ...formObjectKeyValue,
                                ['value']: formObjectKeyValue.value.filter((o, j) => j !== index)
                            });
                        }} response={v}/>
                    })
                }
            </div>
            <div>
                {
                    addNew ?
                        <AddJobResponseType
                            jobResponseTypeOptions={jobResponseTypeOptions}
                            interviewTypeOptions={interviewTypeOptions}
                            addNew={(newItem) => {
                                console.log("newItem", newItem);
                                handleFormObjectChange('jobApplicationResponses', {
                                    ...formObjectKeyValue,
                                    ['value']: [
                                        ...formObjectKeyValue.value,
                                        newItem
                                    ]
                                });
                                setAddNew(false);
                            }}
                            close={() => {
                                setAddNew(false);
                            }}
                        /> : null
                }
            </div>
        </div>
    );
});

