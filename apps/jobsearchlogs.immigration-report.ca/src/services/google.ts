import * as google from '@googlemaps/google-maps-services-js';

const getToken = async () => {
    const {AutocompleteSessionToken} = await google.maps.importLibrary("places")
}
