import { useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"

export default function useRemoveImage(setImage) {

    const [error, setError] = useState(null)
    const [isRemoving, setIsRemoving] = useState(false)

    async function removeImage(publicId) {
        try {
            setIsRemoving(true)
            await bazarBhaiApi.delete(`/media/?publicId=${publicId}`)
            setImage({ publicId: "", url: "" })
        } catch (error) {
            handleError(error, setError, "deleleting image")
        } finally {
            setIsRemoving(false)
        }
    }

    return { isRemoving, error, removeImage }
}
