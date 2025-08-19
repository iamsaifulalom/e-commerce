import { useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"
import { useNavigate } from "react-router-dom"
export default function useUpdateUser(setError) {

    const [isUpdating, setIsUpdating] = useState(false)
    const navigate = useNavigate()

    async function updateUser(userData) {
        try {
            setIsUpdating(true)
            await bazarBhaiApi
                .put("/users", userData)
            navigate("/users")
        } catch (error) {
            handleError(error, setError, "updating user")
        } finally {
            setIsUpdating(false)
        }
    }


    return { isUpdating, updateUser }
}
