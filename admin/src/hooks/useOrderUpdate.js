import { useState } from "react"
import bazarBhaiApi from "../config/axios"
import handleError from "../helper/handleError"


export  function useOrderUpdata(setIsOrderUpdating) {
   const [message, setMessage] = useState(null)
   const [error, setError] = useState(null)

   async function updataOrderState(data) {
    try {
        setIsOrderUpdating(true);
        const res = await bazarBhaiApi.put("/orders" , data)
        setMessage(res.data.message)
    } catch (error) {
        handleError(error , setError , "updatign order status")
    } finally {
        setIsOrderUpdating(false)
    }
   }
    return {
        updataOrderState,
        error,
        message,
        setMessage,
        setError
    }
}