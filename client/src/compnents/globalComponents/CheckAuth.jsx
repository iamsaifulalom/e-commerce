import { useEffect, useState } from "react"
import { Navigate} from "react-router-dom"
import bazarBhaiApi from "../../config/axios"


export default function CheckAuth({ children, allowedRole = [] }) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [role, setRole] = useState("")

    useEffect(() => {
        async function getUser() {
            try {
                setIsLoading(true)
                const res = await bazarBhaiApi.get("/api/users/me");
                setRole(res.data.role)
            } catch (error) {
                const errorMessage = error?.response?.data?.error || "কোন একটা ক্রুটি হয়েছে।"
                console.log("Error fetching user:", errorMessage)
                setError(errorMessage)
            } finally {
                setIsLoading(false)
            }
        }
        getUser()
    }, [])

    const isAllowed = allowedRole.includes(role)

    if (isLoading) {
        return (
            <div className='flex justify-center w-full mt-20'>
                <div className="aspect-square h-8 duration-75 rounded-full border-4 border-orange-400 animate-spin border-l-transparent"></div>
            </div>
        )
    }



    if (error) {
        return (
            <div className="text-center mt-10 text-red-500 font-semibold">
                {error}
            </div>
        )
    }

    if (!isAllowed) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}
