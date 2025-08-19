import { useQuery } from '@tanstack/react-query'
import bazarBhaiApi from '../../config/axios'


export const useOrderDetails = (orderId) => {
    return useQuery({
        queryKey: ["orderDetails", orderId],
        queryFn: async function () {
            const res = await bazarBhaiApi.get(`/orders/${orderId}`)
            return res.data
        }
    })
}