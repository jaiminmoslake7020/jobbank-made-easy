import {array, date, number, object, string} from 'yup';

export const validateRequiredString = async (value:any) => {
    let schema = object({
        value: string().required(),
    });
    try {
        return await schema.validate({
            value
        });
    } catch (e) {
        // console.log("validateRequiredString", e.errors);
        return e.errors;
    }
};

export const validateEmail = async (value:any):Promise<string | object> => {
    let schema = object({
        value: string().email(),
    });

    try {
        return await schema.validate({
            value
        });
    } catch (e) {
        // console.log("validateEmail", e.errors);
        return e.errors;
    }
};

export const validateAddress = async (value:any):Promise<string | object> => {
    let schema = object({
        street_number: string().required(),
        street_name: string().required(),
        city: string().required(),
        province: string().required(),
        country: string().required(),
        zipcode: string().required(),
    });

    try {
        // parse and assert validity
        return await schema.validate(value);
    } catch (e) {
        // console.log("validateAddress", e.errors);
        return e.errors;
    }
};

export const validateCompany = async (value:any):Promise<any> => {
    let schema = object({
        name: string().required(),
        subsidiary: string().nullable(),
        website: string().matches(/^https?:\/\/[^\s/$.?#].[^\s]*(\?[^\s#]*)?$/, {
            message: 'Website must be a valid url.'
        }).required(),
        email: string().email().nullable(),
        phone: string().matches(/^[0-9]{0,4}-?[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/, {
            message: 'Phone number must be numbers and can contain number and seperated with "-", at least 9-10 chars.'
        }).nullable()
    });
    const {
        address, ...rest
    } = value;
    // parse and assert validity
    const addressResult = await validateAddress(address);
    try {
        // parse and assert validity
        const restResult = await schema.validate(rest);
        if (Array.isArray(addressResult) && addressResult[0]) {
            return {
                hasErrors: true,
                address: 'Invalid address.'
            };
        }
        return {
            address: addressResult,
            ...restResult,
        }
    } catch (e) {
        // console.log("validateCompany", e.errors);
        const errorObject = {};
        e.errors.forEach(error => {
            const eL = error.toLowerCase();
            if (eL.indexOf('name') !== -1) {
                errorObject['name'] = error;
            }
            if (eL.indexOf('website') !== -1) {
                errorObject['website'] = error;
            }
            if (eL.indexOf('email') !== -1) {
                errorObject['email'] = error;
            }
            if (eL.indexOf('phone') !== -1) {
                errorObject['phone'] = error;
            }
        });
        return {
            hasErrors: true,
            ...errorObject,
            ...(Array.isArray(addressResult) && addressResult[0] ? {address: 'Invalid address.'} : {})
        };
    }
};

