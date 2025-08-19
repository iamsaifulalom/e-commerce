import { useState } from 'react'
import bazarBhaiApi from '../config/axios'
import handleError from '../helper/handleError'

export default function useRemoveImg({ setError, setImages }) {
    const [removingImgId, setRemovingImgId] = useState("")

    async function removeImage(publicId) {
        try {
            setRemovingImgId(publicId)
            await bazarBhaiApi.delete(`/media/?publicId=${publicId}`)
            setImages(p => {
                const newImage = p.filter(img => img.publicId !== publicId)
                return newImage
            })
        } catch (err) {
            handleError(err, setError, "removing image")
        } finally {
            setRemovingImgId("")
        }
    }


    return { removingImgId, removeImage }
}
