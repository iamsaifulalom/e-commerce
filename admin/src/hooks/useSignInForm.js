import { useState } from "react";

export default function useSignInForm() {
    const [userData, setUserData] = useState({
        phoneNumber: "",
        password: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData(p => ({ ...p, [name]: value }))

    }

    return { userData, handleChange }
}