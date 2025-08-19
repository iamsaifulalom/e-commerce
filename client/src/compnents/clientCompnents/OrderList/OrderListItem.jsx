import { Link } from "react-router-dom"

export default function OrderListItem({ order }) {

  const orderStatus = order?.orderStatus;
  const paymentStatus = order?.paymentStatus;
  const failed = paymentStatus === "ব্যার্থ" || orderStatus === "ব্যার্থ"

  return (
    <Link to={`/order/${order?._id}`}>
      <div className="flex  w-full gap-2 h-20 border border-gray-300 mt-2 rounded p-1 justify-between">
        <div className="h-full aspect-square flex justify-center">
          <img src={order?.image} className="aspect-square h-full object-contain border border-gray-300 rounded" />
        </div>
        <div className="w-full border font-bold py-1 rounded border-gray-300 text-sm px-3 items-center">
          <h1>সময়ঃ <span className="ml-2 font-normal">{order?.createdAt}</span></h1>
          <h1>অর্ডারঃ
            <span className={`ml-2 font-normal ${failed ? "text-red-500" : ""}`}>
              {order?.orderStatus}
            </span>
          </h1>
          <h1>পেমেন্টঃ <span className="font-normal">ডেলিভারির সময় টাকা দিন ❤️</span></h1>
        </div>
      </div>
    </Link>
  )
}
