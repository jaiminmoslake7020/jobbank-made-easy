import {useSearchParams} from 'next/navigation';

export const getJobSearch = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
        search: searchParams.get('search') as string || '',
        location: searchParams.get('location') as string || '',
        isLmia: Boolean(searchParams.get('isLmia')) as boolean || false
    };
}


export const useJobSearch = () => {
    const searchParams = useSearchParams();
    const query = {
        search: searchParams.get('search') as string || '',
        location: searchParams.get('location') as string || '',
        isLmia: Boolean(searchParams.get('isLmia')) as boolean || false
    };
    return {
        query
    };
}
