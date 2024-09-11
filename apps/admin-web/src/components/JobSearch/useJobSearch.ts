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
        isLmia: Boolean(searchParams.get('isLmia')) as boolean || false,
    };
    return {
        query
    };
}

export const usePagination = () => {
    const searchParams = useSearchParams();
    const pageNumber = Number(searchParams.get('page'));
    const limitNumber = Number(searchParams.get('limit'));
    const page = !isNaN(pageNumber) ? Number(pageNumber) : 1;
    const limit = !isNaN(limitNumber) ? Number(limitNumber) : 1;
    return {
        page, limit
    };
}
