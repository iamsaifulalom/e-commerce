import { useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"
import {useNavigate} from "react-router-dom"

export default function useCreateCategory() {

    const navigate = useNavigate()

    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [message, setMessage] = useState(null)

    async function createCategory(data) {
        try {
            setIsCreating(true)
            const res = await bazarBhaiApi.post("/categories/", data)
            const message = res.data.message || "Success"
            setMessage(message)
            navigate("/categories")
        } catch (error) {
            handleError(error, setError, "creating category")
        } finally {
            setIsCreating(false)
        }
    }

    return { isCreating, error, message, createCategory }
}

