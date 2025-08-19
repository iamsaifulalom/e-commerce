import { useQuery } from "@tanstack/react-query"
import bazarBhaiApi from "../config/axios"

export default function useGetUsers({ page, role, search }) {
    return useQuery({
        queryKey: [page, role, search],
        queryFn: async () => {
            const res = await bazarBhaiApi.get("/users", {
                params: { page, role, search }
            })
            console.log(res.data)
            return res.data
        }
    })
}
