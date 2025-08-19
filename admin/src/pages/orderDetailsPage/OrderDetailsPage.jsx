import { useParams } from "react-router-dom"
import { useOrderDetails } from "./useOrderDetails"
import OrderOverview from "./OrderOverview"
import Loader from "../../componnents/ui/Loader"
import OrderItemCard from "./OrderItemCard"

export default function OrderDetailsPage() {

    const { orderId } = useParams()
    const { isLoading, error, data } = useOrderDetails(orderId)

    if (isLoading) return <Loader />
    if (error) throw new Error(error)

    return (
        <div className="max-w-xl text-slate-700 mx-auto">
            <h1 className="heading mb-5 text-xl font-bold">Order details</h1>
            <div className="shadow-lg p-4 shadow-gray-300 rounded w-full">
                <OrderOverview order={data} />

                {/*  products user brought showing here */}
                <div className="print:hidden">
                    <h1 className="text-xl font-bold mt-2">প্রোডাক্ট</h1>
                    {data?.cart?.map(item => (
                        <OrderItemCard key={item?._id} item={item} />
                    ))}
                </div>

                {/* ===== for signature ======= */}
                <div>
                    <h1 className="text-right text-xl font-bold hidden print:block mt-5">স্বাক্ষর</h1>
                </div>
            </div>
        </div>
    )
}
