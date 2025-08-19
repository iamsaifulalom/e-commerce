import { useQuery } from "@tanstack/react-query"
import bazarBhaiApi from "../config/axios"

export default function useGetChildCategories(parentId) {

    return useQuery({
        queryKey: [parentId],
        queryFn: async () => {
            const res = await bazarBhaiApi
                .get("/categories/child-categories?parent=" + parentId)
            return res.data
        }
    })
}
