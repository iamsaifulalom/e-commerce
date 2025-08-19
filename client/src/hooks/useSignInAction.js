import { useState } from "react";
import handleError from "../helper/handleError"
import bazarBhaiApi from "../config/axios";
import { useNavigate } from "react-router-dom"

export default function useSignInAction() {
    const [isSigning, setIsSigning] = useState(false);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function handleSignIn(phoneNumber) {
        try {
            setIsSigning(true);
            const res = await bazarBhaiApi
                .post("/users/sign-in", { phoneNumber });

            localStorage.setItem("authToken", res.data.authToken);
            navigate("/cart", { replace: true })
        } catch (error) {
            handleError(error, setError)
        } finally {
            setIsSigning(false)
        }
    }

    return { isSigning, error, setError, handleSignIn }
}
