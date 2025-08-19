import { useState } from "react"
import handleError from "../helper/handleError"
import bazarBhaiApi from "../config/axios"
import { useNavigate } from "react-router-dom"

export default function useCreateProduct() {
    const navigate = useNavigate()

    const [error, setError] = useState(null)
    const [isCreating, setIsCreating] = useState(false)

    async function createProduct(body) {
        setIsCreating(true)
        try {
            const response = await bazarBhaiApi.post("/products", body)
            navigate("/products")
        } catch (error) {
            handleError(error, setError, "creating product")
        } finally {
            setIsCreating(false)
        }
    }


    return { error, setError, isCreating, createProduct }
}
