import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("authToken")
        navigate("/sign-in")
    }, [navigate]);

    return null;
}
