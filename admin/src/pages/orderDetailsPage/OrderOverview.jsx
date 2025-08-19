import OrderSummaryRow from "./OrderSummaryRow";

export default function OrderOverview({ order }) {
  const {
    name,
    phoneNumber,
    secondPhoneNumber,
    fullAddress,
    area,
    village
  } = order?.shippingAddress;

  const customer = order?.customer;
  const {
    _id,
    createdAt,
    orderStatus,
    deliveryFees,
    deliveryType,
    totalCost,
    
  } = order;

  return (
    <div className="border-gray-300 mb-2 text-slate-700  w-full">
      <OrderSummaryRow text="অর্ডার আইডি" value={_id} />
      <OrderSummaryRow text="সময়" value={createdAt} />
      <OrderSummaryRow text="অর্ডার স্টেইট" value={orderStatus} />
      <OrderSummaryRow text="ডেলিভারি ফি" value={`${deliveryFees} ৳`} />
      <OrderSummaryRow text="ডেলিভারি ধরন" value={deliveryType} />
      <OrderSummaryRow text="ক্যাশ অন ডেলিভারি" value={`${totalCost} ৳`} />
     
      <h1 className="text-xl mt-5 font-bold mb-2">শিপিং অ্যাড্রেস</h1>
      <OrderSummaryRow text="নাম" value={name} />
      <OrderSummaryRow text="ফোন নাম্বার" value={phoneNumber} />
      <OrderSummaryRow text="ইমার্জেন্সি ফোন নাম্বার " value={secondPhoneNumber} />
      <OrderSummaryRow text="এরিয়া" value={area} />
      <OrderSummaryRow text="গ্রাম" value={village} />
      <OrderSummaryRow text="পূর্ন ঠিকানা " value={fullAddress} />
      
      <h1 className="text-xl mt-5 font-bold mb-2">যিনি অর্ডার করেছেন</h1>
      <OrderSummaryRow text="ফোন নাম্বার" value={customer?.phoneNumber} />
    </div>
  )
}
