import React, {useEffect, useState} from 'react';
import {validateAddress} from '../../../../utils/validations';

export type AddressPropTypes = {
    wrapperClassName: string,
    labelClassName: string,
    inputClassName: string,
    feedbackSpanClassName: string,
    setAddress: Function,
    addressId: string
};

async function onPlaceChanged(place:any, input: any, setFeedback: Function, setAddress: Function) {
    const addressObject = {};
    if (place.address_components) {
        place.address_components.forEach((component) => {
            const types = component.types;
            if (types.includes("street_number")) {
                addressObject['street_number'] = component.long_name;
            }
            if (types.includes("route")) {
                addressObject['street_name'] = component.long_name;
            }
            if (types.includes("locality")) {
                addressObject['city'] = component.long_name;
            }
            if (types.includes("administrative_area_level_1")) {
                addressObject['province'] = component.short_name;
            }
            if (types.includes("country")) {
                addressObject['country'] = component.long_name;
            }
            if (types.includes("postal_code")) {
                addressObject['zipcode'] = component.long_name;
            }
        });
    }

    const v = await validateAddress(addressObject);
    if (typeof v === 'object') {
        setFeedback({
            type: 'success',
            message: null
        });
        setAddress(addressObject);
    } else {
        setFeedback({
            type: 'error',
            message: 'Address should have a street number, street name, city name, province, country, and zip-code.'
        });
    }
}

const setupAutocomplete = async (setFeedback: Function, setAddress: Function, uuid: string) => {
    const input = document.getElementById(uuid) as HTMLInputElement;
    const options = {
        componentRestrictions: { country: ["us", "ca"] },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
        types: ["address"],
    };

    if (input !== null) {
        // @ts-ignore
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener("place_changed", async () => {
            const place = autocomplete.getPlace();
            await onPlaceChanged(place, input, setFeedback, setAddress);
        });
    }
}

function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

const Address = (props: AddressPropTypes) => {
    const {
        wrapperClassName,
        labelClassName,
        inputClassName,
        feedbackSpanClassName,
        setAddress,
        addressId
    } = props;

    const [feedback, setFeedback] = useState<{
        type: 'error' | 'success',
        message: string | null
    } | null>(null);

    useEffect(() => {
        const mount = () => {
            // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places" async></script>
            const isLoaded = document.getElementById('googleapis');
            if (isLoaded === null) {
                const token = process.env.NEXT_PUBLIC_MAPS_API_KEY;
                const s = document.createElement('script');
                s.src = `https://maps.googleapis.com/maps/api/js?key=${token}&libraries=places`
                s.async = true;
                s.id = 'googleapis';
                document.head.appendChild(s);
            }

            setTimeout(async () => {
                await setupAutocomplete(
                    setFeedback,
                    setAddress,
                    addressId
                );
            }, 1000);
        }
        return mount();
    },[setAddress, addressId])

    return (
        addressId ?
        <div className={` ${wrapperClassName} ${feedback ? 'has-'+feedback.type : ''}   `}>
            <label htmlFor="address" className={` ${labelClassName} `}>Address</label>
            <input
                type="text"
                id={addressId}
                name="address"
                className={` ${inputClassName}   `}
                placeholder="Enter company address"
                required
                autoComplete={"off"}
                onChange={(e) => {
                    const v = e.target.value;
                    if (v === '') {
                        setFeedback({
                            type: 'error',
                            message: 'Address is required.'
                        });
                    }
                }}
            />
            {
                feedback && feedback.message ? <span className={` ${feedbackSpanClassName}   `} >{feedback.message}</span> : null
            }
        </div> : null
    );
}

export default Address;
