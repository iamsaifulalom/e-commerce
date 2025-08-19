import { useOrderUpdata } from "../../hooks/useOrderUpdate";
import Toast from "../ui/Toast";
import { useState } from "react";

const options = ["Pending", "Completed", "Delivered", "Cancelled", "Received"]

export default function OrderStatusUpdater({ orderId, orderStatus }) {

    const [isOrderUpdating, setIsOrderUpdating] = useState(false)

    const {
        error,
        updataOrderState,
        message,
        setMessage,
        setError
    } = useOrderUpdata(setIsOrderUpdating)

    function handleChange(e) {
        const { value } = e.target
        const data = {
            _id: orderId,
            orderStatus: value
        }
        updataOrderState(data)
    }

    return (
        <>
            <Toast
                onClick={() => setMessage(null)}
                message={message} />
            <Toast
                danger={true}
                onClick={() => setError(null)}
                message={error} />

            {isOrderUpdating && <span >Updating...</span>}
            {!isOrderUpdating &&

                <select
                    defaultValue={message || orderStatus}
                    className="border text-xs rounded"
                    name="orderStatus"
                    onChange={handleChange}
                >
                    {options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            }

        </>
    );
}