import { useState } from "react";
import handleError from "../helper/handleError"
import bazarBhaiApi from "../config/axios";

export default function useUploadSingleImage(setImage) {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const uploadImage = async (e) => {
        setIsLoading(true)
        const image = e.target.files[0];
        try {
            const formdata = new FormData()
            formdata.append("image", image)
            const res = await bazarBhaiApi.post("/media/image", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(res.data)
            setImage(res.data)

        } catch (error) {
            handleError(error, setError, "uploading category image")
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, error, uploadImage, setError }
}
