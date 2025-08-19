import { useState } from "react"
import handleError from "../helper/handleError"
import { useNavigate } from "react-router-dom"
import bazarBhaiApi from "../config/axios"

export default function useDeleteProduct() {
    const [error, setError] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [dltId, setDltId] = useState("")
    const navigate = useNavigate()

    async function deleteProduct(productId) {
        try {
            setDltId(productId)
            await bazarBhaiApi
                .delete("/products/" + productId)
            navigate(0)
        } catch (error) {
            handleError(error, setError, "deleting error")
        } finally {
            setDltId("")
        }
    }


    return { error, setError, isDeleting, dltId, deleteProduct }
}
