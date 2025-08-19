import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import bazarBhaiApi from "../../config/axios";
import Loader from '../ui/Loader'


export default function CheckAuth({ children, allowedRole = [] }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                setIsLoading(true)
                const res = await bazarBhaiApi.get("/users/me");
                setRole(res.data.role)
            } catch (error) {
                const errorMessage = error?.response?.data?.error || error?.message || "কোন একটা ক্রুটি হয়েছে।"
                const isNotLoggedIn = error.status === 401
                if (isNotLoggedIn) navigate("/sign-in")
                console.log("Error fetching user:", errorMessage)
                setError(errorMessage)
            } finally {
                setIsLoading(false)
            }
        }
        getUser()
    }, [])

    const isAllowed = allowedRole.includes(role)

    if (isLoading) return <Loader />


    if (error) {
        return (
            <div className="text-center mt-10 text-red-500 font-semibold">
                {error}
            </div>
        )
    }

    if (!isAllowed) {
        localStorage.removeItem("authToken")
        return <Navigate to="/unauthorized" replace />
    }

    return children
}
