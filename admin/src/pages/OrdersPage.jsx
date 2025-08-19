import { useState } from "react";
import { useGetOrders } from "../hooks/useGetOrders";
import Paginatore from "../componnents/ui/Paginatore";
import Loader from '../componnents/ui/Loader'
import OrderStatusUpdater from "../componnents/order/OrderStatusUpdater";
import { Link } from 'react-router-dom'
import Toast from "../componnents/ui/Toast";
import SearchBarAndFilter from "../componnents/products/SearchBarAndFilter";

const orderOptions = [
  { name: "Pending", _id: "Pending" },
  { name: "Completed", _id: "Completed" },
  { name: "Delivered", _id: "Delivered" },
  { name: "Cancelled", _id: "Cancelled" },
  { name: "Received", _id: "Received" },
]


export default function OrdersPage() {
  const [page, setPage] = useState(1)
  const [orderStatus, setOrderStatus] = useState("")
  const [orderId, setOrderId] = useState("")

  const { isLoading, orders, hasMore, error, setError } = useGetOrders({
    page,
    orderStatus,
    orderId,
  })

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Orders</h1>
      <SearchBarAndFilter
        clearValue="No filter"
        onChange={(e) => setOrderStatus(e.target.value)}
        options={orderOptions}
        placeholder="Find order by id"
        setSearchTerm={setOrderId}
      />
      {/* if error show */}
      <Toast danger={true} message={error} onClick={() => setError(null)} />
      {orders.length <= 0 && !isLoading && <p className="text-center text-lg">No orders</p>}

      {orders?.map(({ _id, image, createdAt, orderStatus }) => (
        <div className="flex mt-5 p-1 gap-1 w-full h-20 border border-gray-300 rounded">
          {/* order image */}
          <div className="h-full aspect-square border border-gray-300 rounded">
            <Link to={`/order-details/${_id}`}>
              <img src={image} className="w-full h-full object-cover" />
            </Link>
          </div>
          {/* order initial data */}
          <div className=" rounded  text-[13px] md:text-sm p-0.5 text-slate-800  w-full">
            <div className="flex gap-3"><h1> ID: {_id}</h1> <h1 className="select-none">Payment: Cash On Delivery</h1></div>
            <h1> Order time : <span className="text-xs select-none">{createdAt}</span></h1>
            <div className="flex select-none mt-1 items-center gap-3">
              <h1>Order: {orderStatus}</h1>
              <h1>Order changer: <OrderStatusUpdater orderId={_id} orderStatus={orderStatus} /></h1>
            </div>
          </div>
        </div>
      ))}

      {isLoading && <Loader />}

      {!isLoading && <Paginatore hasMore={hasMore} setPage={setPage} page={page} />}
    </div>
  );
}