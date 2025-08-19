import { useEffect, useState } from "react"

export default function useSignInform() {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [isValid, setIsValid] = useState(true)
    const phoneRegEx = /^01[3-9]\d{8}$/;

    function handleChange(e) {
        const { name, value } = e.target;
        setPhoneNumber(value)
    }


    useEffect(() => {
        setIsValid(phoneRegEx.test(phoneNumber))
    }, [phoneNumber])

    return { handleChange, isValid, phoneNumber }
}
