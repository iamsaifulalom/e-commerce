import { useParams } from "react-router-dom"
import { useOrderDetails } from "../hooks/useOrder"
import Loader from "../compnents/globalComponents/Loader"
import OrderOverview from "../compnents/clientCompnents/OrderDetails/OrderOverview"
import OrderItemCard from "../compnents/clientCompnents/OrderDetails/OrderItemCard"

export default function OrderDetails() {

    const { orderId } = useParams()
    const { isLoading, error, data } = useOrderDetails(orderId)

    if (isLoading) return <Loader />
    if (error) throw new Error(error)

    return (
        <div className="max-w-xl text-slate-700 p-4 mx-auto">
            <h1 className="heading">অর্ডারের বিস্তারিত</h1>
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
