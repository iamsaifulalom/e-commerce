import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import bazarBhaiApi from "../config/axios";
import handleError from "../helper/handleError";

export default function useFetchCategoryForUpdate({ setImage, setCategoryInfo }) {

    const [error, setError] = useState(null);
    const [isGetting, setIsGetting] = useState(false);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        async function getCategoryDetails(id) {
            try {
                setIsGetting(true)
                const { data } = await bazarBhaiApi
                    .get("/categories/by-id/" + id)
                const { image, ...info } = data;
                setImage(image)
                setCategoryInfo(info)
            } catch (error) {
                handleError(error, setError, "fetching category data to update")
            } finally {
                setIsGetting(false)
            }
        }

        if (id) {
            getCategoryDetails(id)
        }

    }, [id])


    return { isGetting, error }
}
