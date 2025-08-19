import { useQuery } from "@tanstack/react-query"
import bazarBhaiApi from "../config/axios"

export default function useDashboard() {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const res = await bazarBhaiApi
                .get("/admin-dashboard");
            return res.data;
        }
    })
}
