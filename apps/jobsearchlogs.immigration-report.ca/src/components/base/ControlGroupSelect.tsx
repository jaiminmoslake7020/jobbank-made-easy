import React, {useCallback} from 'react';

export type FeedbackType = {
    type: any,
    message: null | string
};

export type FormObjectKeyValueType = {
    value: any,
    feedback?: FeedbackType
};

export type ControlGroupSelectPropTypes = {
    inputObject: {
        id: string,
        name: string,
        options: {
            value: string | number,
            label: string
        }[],
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

const ControlGroupSelect = (props: ControlGroupSelectPropTypes) => {
    const {
        formObjectKeyValue, handleFormObjectChange, inputObject, labelObject, feedbackObject, validate
    } = props;
    const { value, feedback } = formObjectKeyValue;
    const { id, name, options, isRequired, className, placeholder } = inputObject;
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

    const modifiedOptions = [{
        value: null,
        label: placeholder
    }, ...options];

    return (
        modifiedOptions.length > 0 ?
        <div className={` control-group  ${feedbackType ? 'has-'+feedbackType : ''} `}>
            <label htmlFor="name" className={`  control-group__label ${labelClassName}  `}>{text}</label>
            <select
                id={id}
                name={name}
                required={isRequired}
                className={` control-group__input control-group__select  ${className} `}
                placeholder={placeholder}
                onChange={handleInputChange}
            >
                {
                    modifiedOptions.map(({value, label}) => <option key={value} value={value}>{label}</option>)
                }
            </select>
            {
                message && <span className={` control-group__feedback ${feedbackClassName} `}>{message}</span>
            }
        </div> : null
    );
}

export default ControlGroupSelect;
