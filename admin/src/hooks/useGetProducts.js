import { useQuery } from "@tanstack/react-query"
import bazarBhaiApi from "../config/axios"


export default function useGetProducts(params) {
    return useQuery({
        queryKey: [params],
        queryFn: async () => {
            const res = await bazarBhaiApi
                .get("/products", { params })
            return res.data
        }
    })
}