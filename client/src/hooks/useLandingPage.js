import { useQuery } from "@tanstack/react-query"
import { getLandingPageData } from "../api/landingPage"

export function useLandingPage() {
    return useQuery({
        queryKey: ["landingPage"],
        queryFn: getLandingPageData,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    })
}