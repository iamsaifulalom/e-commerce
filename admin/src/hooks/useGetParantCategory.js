import { useEffect, useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"

export default function useGetParantCategory() {
    const [categories, setCategories] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getParant() {
            try {
                setIsLoading(true)
                const res = await bazarBhaiApi.get("/categories")
                setCategories(res.data)
            } catch (error) {
                handleError(error, setError, "fetching parant category")
            } finally {
                setIsLoading(false)
            }
        }
        getParant()
    }, [])



    return { categories, error, isLoading }
}
