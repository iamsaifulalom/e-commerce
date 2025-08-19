import { useEffect, useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"

export default function useGetCategories({ categoryType, parentId }) {
    const [categories, setCategories] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getCategories() {
            try {
                setIsLoading(true)
                const res = await bazarBhaiApi
                    .get("/categories/by-filter", {
                        params: { categoryType, parentId }
                    })
                setCategories(res.data)
            } catch (error) {
                handleError(error, setError, "fetching categories")
            } finally {
                setIsLoading(false)
            }
        }
        getCategories()
    }, [categoryType, parentId])

    return { isLoading, error, setError, categories }
}
