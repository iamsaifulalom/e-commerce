import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import handleError from "../helper/handleError"
import bazarBhaiApi from "../config/axios"


export default function useSignInAction() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function handleSignIn(userData) {
        try {
            setIsLoading(true)
            const res = await bazarBhaiApi.post("/users/sign-in", userData);
            localStorage.setItem("authToken", res.data.authToken)
            navigate("/")
        } catch (error) {
            handleError(error, setError, "signing user")
        } finally {
            setIsLoading(false)
        }
    }


    return { isLoading, handleSignIn, error, setError }
}
