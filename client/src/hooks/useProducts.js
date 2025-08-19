import { fetchProductDetails, fetchProducts } from "../api/products";
import useQueryParams from "../helper/useQueryParams";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts(page) {
    const query = useQueryParams();

    return useQuery({
        queryKey: ["getProducts", query, page],
        queryFn: () => fetchProducts({ ...query, page }),
        keepPreviousData: true,
    });
}

export function useProductDetaisl(id) {
    return useQuery({
        retry: false,
        queryKey: ["productDetails", id],
        queryFn: () => fetchProductDetails(id),
    })
}