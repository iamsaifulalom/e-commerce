import { useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"
import { useNavigate } from "react-router-dom"

export default function updateProduct({ setError }) {

    const [isUpdating, setIsUpdating] = useState(false)
    const navigate = useNavigate()

    async function updata(data) {
        try {
            setIsUpdating(true)
            await bazarBhaiApi
                .put("/products", data)
            navigate("/products")
        } catch (error) {
            handleError(error, setError, "updating product")
        } finally {
            setIsUpdating(false)
        }
    }

    return { isUpdating, updata }
}