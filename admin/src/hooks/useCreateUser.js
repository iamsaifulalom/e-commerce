import { useState } from "react"
import handleError from "../helper/handleError"
import bazarBhaiApi from "../config/axios"
import { useNavigate } from "react-router-dom"


export default function useCreateUser() {
    const [isCreating, setIsCreating] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    async function createUser(userData) {
        try {
            setIsCreating(true)
            await bazarBhaiApi.post("/users", userData)
            navigate("/users")
        } catch (error) {
            handleError(error, setError, "creating user")
        } finally {
            setIsCreating(false)
        }
    }
    return { isCreating, error, setError, createUser }
}
