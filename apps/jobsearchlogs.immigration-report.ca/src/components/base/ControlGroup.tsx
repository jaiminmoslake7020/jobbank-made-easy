import React, {memo, useCallback} from 'react';

export type FeedbackType = {
    type: any,
    message: null | string
};

export type FormObjectKeyValueType = {
    value: any,
    feedback?: FeedbackType
};

export type ControlGroupPropTypes = {
    inputObject: {
        id: string,
        name: string,
        type: string,
        isRequired: boolean,
        className: string,
        placeholder: string,
    },
    labelObject: {
        className: string,
        text: string
    },
    feedbackObject: {
        className: string,
    }
    formObjectKeyValue: FormObjectKeyValueType,
    handleFormObjectChange: Function,
    validate?: Function
};

// eslint-disable-next-line react/display-name
const ControlGroup = (props: ControlGroupPropTypes) => {
    const {
        formObjectKeyValue, handleFormObjectChange, inputObject, labelObject, feedbackObject, validate
    } = props;
    const { value, feedback } = formObjectKeyValue || {};
    const { id, name, type, isRequired, className, placeholder } = inputObject;
    const {
        message, type: feedbackType
    } = feedback || {};
    const {
        className: labelClassName, text
    } = labelObject;
    const {
        className: feedbackClassName
    } = feedbackObject;

    const handleInputChange = useCallback(async ( e ) => {
        const { value, name } = e.target;
        if (validate) {
            const v = await validate(value);
            if (v) {
                handleFormObjectChange( name, {
                    value: value,
                    feedback: null
                });
            }
        } else {
            handleFormObjectChange( name, {
                value: value,
                feedback: null
            });
        }
    }, [handleFormObjectChange, validate]);

    return (
        formObjectKeyValue ?
        <div className={` control-group  ${feedbackType ? 'has-'+feedbackType : ''} `}>
            <label htmlFor="name" className={`  control-group__label ${labelClassName}  `}>{text}</label>
            <input
                type={type}
                id={id}
                name={name}
                required={isRequired}
                className={` control-group__input ${className} `}
                placeholder={placeholder}
                onChange={handleInputChange}
                value={value}
            />
            {
                message && <span className={` control-group__feedback ${feedbackClassName} `}>{message}</span>
            }
        </div> : null
    );
};

export default ControlGroup;
