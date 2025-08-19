import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import bazarBhaiApi from "../config/axios";

export default function useGetUser(setUser) {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    if (!id) return { isLoading: false }

    return useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await bazarBhaiApi.get("/users/" + id)
            setUser(p => ({ ...p, ...res.data }))
            return res.data
        }
    })
}
