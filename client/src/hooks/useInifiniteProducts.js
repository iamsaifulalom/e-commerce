import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { useSearchParams } from 'react-router-dom';

export function useInfiniteProducts(filter) {
    const limit = 20
    const [searchParams] = useSearchParams();

    // Convert searchParams to an object
    const paramsObject = {};
    for (const [key, value] of searchParams.entries()) {
        paramsObject[key] = value;
    }


    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ['products', { limit, ...paramsObject , filter }],
        queryFn: ({ pageParam = 1 }) =>
            fetchProducts({ page: pageParam, limit, ...paramsObject , filter}),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasMore ? allPages.length + 1 : undefined;
        },
    });

    const products = data?.pages.flatMap((page) => page.products) || [];

    return {
        isFetching,
        error,
        products,
        loadMore: fetchNextPage,
        hasMore: hasNextPage,
    };
}
