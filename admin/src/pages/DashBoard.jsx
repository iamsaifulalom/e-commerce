import StatCard from "../componnents/ui/StatCard";
import Loader from "../componnents/ui/Loader";
import Toast from "../componnents/ui/Toast";
import useDashboard from "../hooks/useDashboard";

export default function DashBoard() {

  const { isLoading, error, data } = useDashboard()

  if (isLoading) return <Loader />

  return (
    <div className="text-slate-800">
      <Toast danger={true} message={error?.message} />
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="grid mt-5 grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Categories" value={data?.categories || "Not found"} />
        <StatCard label="Products" value={data?.products} />
        <StatCard danger label="Stock out products" value={data?.stockOutProducts} />
        <StatCard label="Orders" value={data?.orders} />
        <StatCard label="Pending orders" value={data?.pendingOrders} />
        <StatCard danger label="Cancelled orders" value={data?.cancelledOrders} />
        <StatCard label="Customers" value={data?.users} />
      </div>

    </div>
  )
}
