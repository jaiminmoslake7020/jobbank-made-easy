import React, {useCallback, useEffect, useState} from 'react';
import Address from './Address';
import ControlGroup from '../../../base/ControlGroup';
import {validateCompany} from '../../../../utils/validations';
import {useLazyPostCompanyQuery} from '../../../../store/services/api';
import {FormObjectType} from '../../../../types/app';

export type CompanyCreateType = {
    onCreateCompleted ?: Function
};

const CompanyCreate = (props: CompanyCreateType) => {

    const {
        onCreateCompleted
    } = props;

    const [formObject, setFormObject] = useState<FormObjectType>({
        name: {
            value: '',
            feedback: null,
        },
        subsidiary: {
            value: '',
            feedback: null,
        },
        website: {
            value: '',
            feedback: null,
        },
        email: {
            value: '',
            feedback: null,
        },
        phone: {
            value: '',
            feedback: null,
        },
        address: {
            value: '',
            feedback: null,
        }
    });

    const [trigger, { data, error, isFetching, isLoading, isSuccess }] = useLazyPostCompanyQuery();

    const handleFormObjectChange = useCallback(( key: string, keyValueObject: any ) => {
        setFormObject(  prevState => ({
            ...prevState,
            [key] : keyValueObject
        }));
    }, []);

    const validateFormObject = useCallback(async () => {
        const newObject = {} ;
        Object.keys(formObject).forEach((key: string) => {
            newObject[key] = formObject[key].value;
        });
        const d = await validateCompany(newObject);
        if (d && d.hasErrors) {
            const { hasErrors, ...rest } = d;
            setFormObject((prevState) => {
                const changedObject = {};
                Object.keys(rest).forEach((k: string) => {
                    changedObject[k] = {
                        ...prevState[k],
                        "feedback": {
                            type: 'error',
                            message: rest[k]
                        }
                    };
                });
                return {
                    ...prevState,
                    ...changedObject
                };
            });
            return false;
        } else {
            return d;
        }
    }, [formObject])

    const submitFormObject = useCallback(async (v:any) => {
        trigger(v).then((r:any) => {
            if (onCreateCompleted) {
                onCreateCompleted({...v, id: r.data.data.companyId});
            }
        }).catch((e) => {
            console.log(e);
        });
    }, [trigger, onCreateCompleted])
    const hasErrors = formObject.address.feedback && formObject.address.feedback.message;
    const addressHasErrorClass = hasErrors ? 'has-'+formObject.address.feedback.type : '';

    return (
        <div className={"company-create w-container justify-center flex"} >
            <form className="company-create__form form  " onSubmit={ async (e) => {
                e.preventDefault();
                const d = await validateFormObject();
                submitFormObject(d);
            }}>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Company</h2>
                <ControlGroup inputObject={{
                    id: 'name',
                    name: 'name',
                    type: 'text',
                    isRequired: true,
                    className: " company-create__input ",
                    placeholder: "Enter company name",
                }}
                              labelObject={{
                                  className: " company-create__label ",
                                  text: 'Name'
                              }}
                              feedbackObject={{
                                  className: "  company-create__feedback "
                              }}
                              formObjectKeyValue={formObject.name}
                              handleFormObjectChange={handleFormObjectChange}
                />
                <ControlGroup inputObject={{
                    id: 'subsidiary',
                    name: 'subsidiary',
                    type: 'text',
                    isRequired: false,
                    className: " company-create__input ",
                    placeholder: "Enter subsidiary name (optional)",
                }}
                              labelObject={{
                                  className: " company-create__label ",
                                  text: 'Subsidiary'
                              }}
                              feedbackObject={{
                                  className: "  company-create__feedback "
                              }}
                              formObjectKeyValue={formObject.subsidiary}
                              handleFormObjectChange={handleFormObjectChange}
                />
                <ControlGroup inputObject={{
                    id: 'website',
                    name: 'website',
                    type: 'text',
                    isRequired: true,
                    className: " company-create__input ",
                    placeholder: "Enter company website",
                }}
                              labelObject={{
                                  className: " company-create__label ",
                                  text: 'Website'
                              }}
                              feedbackObject={{
                                  className: "  company-create__feedback "
                              }}
                              formObjectKeyValue={formObject.website}
                              handleFormObjectChange={handleFormObjectChange}
                />
                <ControlGroup inputObject={{
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    isRequired: true,
                    className: " company-create__input ",
                    placeholder: "Enter company email",
                }}
                              labelObject={{
                                  className: " company-create__label ",
                                  text: 'Email'
                              }}
                              feedbackObject={{
                                  className: "  company-create__feedback "
                              }}
                              formObjectKeyValue={formObject.email}
                              handleFormObjectChange={handleFormObjectChange}
                />
                <ControlGroup inputObject={{
                    id: 'phone',
                    name: 'phone',
                    type: 'text',
                    isRequired: true,
                    className: " company-create__input ",
                    placeholder: "Enter company email",
                }}
                              labelObject={{
                                  className: " company-create__label ",
                                  text: 'Phone'
                              }}
                              feedbackObject={{
                                  className: "  company-create__feedback "
                              }}
                              formObjectKeyValue={formObject.phone}
                              handleFormObjectChange={handleFormObjectChange}
                />
                <Address
                    addressId={'company-create-address'}
                    wrapperClassName={` control-group company-create__control-group ${addressHasErrorClass} `}
                    labelClassName={" control-group__label company-create__label "}
                    feedbackSpanClassName={" control-group__feedback company-create__feedback "}
                    inputClassName={" control-group__input company-create__input "}
                    setAddress={(newAddress) => {
                        handleFormObjectChange('address', {
                            value: newAddress,
                            feedback: null
                        });
                    }}
                />
                {
                    hasErrors ?
                        <div className={` control-group company-create__control-group has-${formObject.address.feedback.type} -mt-2 `}>
                            <span
                                className={" control-group__feedback company-create__feedback "}>{formObject.address.feedback.message}</span>
                        </div> : null
                }
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

export default CompanyCreate;
