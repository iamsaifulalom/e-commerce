import { useQuery } from "@tanstack/react-query";
import { getRelatedProducts } from "../api/relatedProducts";

export default function useGetRelatedProducts(params) {
    return useQuery({
        queryKey: [params],
        queryFn: () => getRelatedProducts(params)
    })
}
