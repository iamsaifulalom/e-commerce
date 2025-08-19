import { useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"
import { useNavigate } from "react-router-dom"

export default function useUpdateCategory() {
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate();


    async function updataCategory(data) {
        try {
            setIsUpdating(true)
            const res = await bazarBhaiApi
                .put("/categories", data)
            navigate("/categories")
        } catch (error) {
            handleError(error, setError, "updating categories")
        } finally {
            setIsUpdating(false)
        }
    }


    return { isUpdating, error, updataCategory }
}
