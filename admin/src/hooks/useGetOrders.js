import { useEffect, useState } from "react"
import handleError from "../helper/handleError"
import bazarBhaiApi from "../config/axios"

export function useGetOrders(params) {
    const [orders, setOrders] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { page, orderStatus, paymentStatus, orderId } = params

    useEffect(() => {
        async function getOrders() {
            try {
                setIsLoading(true)
                const { data } = await bazarBhaiApi
                    .get("/orders", { params })

                setOrders(data?.orders)
                setHasMore(data?.hasMore)
            } catch (error) {
                handleError(error, setError, "fetching orders in /orders route")
            } finally {
                setIsLoading(false)
            }
        }
        getOrders()
    }, [page, orderStatus, paymentStatus, orderId])

    return { orders, hasMore, error, setError , isLoading }
}
