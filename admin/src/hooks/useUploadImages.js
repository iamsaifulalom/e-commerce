import { useState } from "react";
import bazarBhaiApi from "../config/axios";
import handleError from "../helper/handleError";

export default function useUploadImages(setImages) {

    const [isUploading, setIsUploading] = useState(false)
    const [lenght, setLenght] = useState(0)
    const [error, setError] = useState(null)

    async function uploadImgs(e) {
        setIsUploading(true)
        try {
            const arraryOfImages = Array.from(e.target.files)
            setLenght(arraryOfImages.length)
            const formData = new FormData()
            arraryOfImages.forEach(img => formData.append("images", img))
            const response = await bazarBhaiApi.post("/media/images", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setImages(p => ([...p, ...response?.data]))
        } catch (err) {
            handleError(err, setError, "uploading products images")
        } finally {
            setIsUploading(false)
        }
    }

    return { isUploading, error ,setError, lenght, uploadImgs }
}
