import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function useAuth(user) {
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            const isAdmin = user.role === "admin";
            if (!isAdmin) navigate("/unauthorized");

        }
    }, [user]);
}

