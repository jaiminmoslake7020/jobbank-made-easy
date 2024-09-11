import { LocationObjectType } from 'types';
import { cities, provinces } from '../../constants/address';

export function camelToSnake(camelCaseString) {
  return camelCaseString
    .replace(/([A-Z])/g, '_$1') // Insert an underscore before each uppercase letter
    .toLowerCase(); // Convert the entire string to lowercase
}

export function trimCharacters(str: string, chars: string): string {
  const escapeRegExp = (s: string) =>
    s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const pattern = `^[${escapeRegExp(chars)}]+|[${escapeRegExp(chars)}]+$`;
  const regex = new RegExp(pattern, 'g');
  return str.replace(regex, '');
}

export const replaceAll = (str: string, char: string): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return str.replaceAll(str, char);
};

export const getLocationString = (l: LocationObjectType) => {
  let r = '';
  const { streetAddress, addressLocality, addressRegion, postalCode } = l;
  if (streetAddress && streetAddress !== '') {
    r = streetAddress + ', ';
  }
  if (addressLocality && addressLocality !== '') {
    r += addressLocality + ', ';
  }
  if (addressRegion && addressRegion !== '') {
    r += addressRegion + ', ';
  }
  if (postalCode && postalCode !== '') {
    r += postalCode;
  }
  return trimCharacters(r.trim(), ',');
};

export const getAddressRegion = (address: string) => {
  if (typeof address === 'string' && address !== '') {
    const trimmedAddress = address.trim();
    const getProvinces = provinces.filter(
      ({ abbreviation }) => trimmedAddress.indexOf(abbreviation) !== -1,
    );
    if (getProvinces.length > 0) {
      return getProvinces[0].abbreviation;
    }
  }
  return 'UNKNOWN';
};

export const getAddressLocality = (address: string, province: string) => {
  if (typeof address === 'string' && address !== '' && province !== 'UNKNOWN') {
    const trimmedAddress = address.trim().toLowerCase();
    const citiesList = cities[province] || [];
    const getCity = citiesList.filter(
      (city) => trimmedAddress.indexOf((city || '').toLowerCase()) !== -1,
    );
    if (getCity.length > 0) {
      return getCity[0];
    }
  }
  return 'UNKNOWN';
};
