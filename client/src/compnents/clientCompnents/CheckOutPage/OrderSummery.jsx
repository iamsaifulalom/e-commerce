import useCartStore from "../../../store/useCartStore";
import OrderSummaryRow from "./OrderSummaryRow";

export default function OrderSummery({ deliveryCost = 0 }) {
    const productsTotalCost = useCartStore(state => state.totalPrice)
    const totalCost = productsTotalCost + deliveryCost

    return (
        <div className="p-4 flex-1 border rounded">
            <h1 className="heading">অর্ডার সারসংক্ষেপ</h1>
            <OrderSummaryRow text="শুধু পণ্য --" value={`${productsTotalCost} ৳`} />
            <OrderSummaryRow text="ডেলিভারি ফি --" value={`${deliveryCost} ৳`} />
            <OrderSummaryRow className="border-b-transparent" text="ডেলিভারি ফি সহ সর্বমোট --" value={`${totalCost} ৳`} />
        </div>
    )
}
