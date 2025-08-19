import { useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"
import { useNavigate } from "react-router-dom"

export default function useDeleteCategory() {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState(null);
    const navigate = useNavigate()


    async function deleteCategory(catId) {
        try {
            setIsDeleting(true)
            const res = await bazarBhaiApi
                .delete(`/categories/${catId}`)
            navigate(0)
        } catch (error) {
            handleError(error, setError, "deleting category")
        } finally {
            setIsDeleting(false)
        }
    }

    return { error, isDeleting, setError, deleteCategory }
}
