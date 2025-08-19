import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import handleError from "../helper/handleError"
import bazarBhaiApi from "../config/axios"

export default function useGetProductDetails({ setError, setImages, setProductInfo }) {
    const [searchParams] = useSearchParams()
    const productId = searchParams.get("id")
    if (!productId) return

    useEffect(() => {
        async function getProductDlts() {
            try {
                const res = await bazarBhaiApi
                    .get(`/products/${productId}`);
                const {images , ...productInfo} = res.data;
                setImages(images);
                setProductInfo(productInfo)
            } catch (error) {
                handleError(error, setError, "geting product details")
            }
        }

        getProductDlts()
    }, [productId])

}
