import {useCallback} from 'react';
import {usePathname, useSearchParams} from 'next/navigation'
import {useRouter} from 'next/router';

export const usePagination = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('limit')) || 10;

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value);

            return params.toString()
        },
        [searchParams]
    )

    const setPage = useCallback((newPage: number) => {
        const q = createQueryString('page', String(newPage));
        router.push(pathname + '?' + q);
    }, []);

    const setPageSize = useCallback((newPageSize: number) => {
        const q = createQueryString('limit', String(newPageSize));
        router.push(pathname + '?' + q);
    }, []);

    const nextPage = useCallback(() => {
        setPage(page + 1);
    }, [page])

    const prevPage = useCallback(() => {
        setPage(page - 1);
    }, [page])

    const paginationString = 'page='+page+'&limit='+pageSize;

    return {
      page, pageSize, nextPage, prevPage, setPageSize, paginationString
    };
}
