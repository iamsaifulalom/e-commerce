import { useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"
import useCartStore from "../store/useCartStore"
import { useQuery } from "@tanstack/react-query"
import { fetchOrderDetails, fetchOrders } from "../api/order"

export function usePlaceOrder() {

    const clearCart = useCartStore(state => state.clearCart)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)


    async function placeOrder(order) {
        try {
            setIsLoading(true)
            const res = await bazarBhaiApi.post("/orders", order)
            setData(res.data)
            clearCart()
        } catch (error) {
            handleError(error, setError)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, data, error,setError, placeOrder }
}


export const useOrderDetails = (orderId) => {
   return useQuery({
    queryKey : ["orderDetails" , orderId],
    queryFn : () => fetchOrderDetails(orderId)
   })
}
export const useOrders = (page) => {
   return useQuery({
    queryKey : ["orderDetails" , page],
    queryFn : () => fetchOrders(page)
   })
}
