import OrderSummaryRow from "../CheckOutPage/OrderSummaryRow"
import truncateText from '../../../helper/truncateText'


export default function OrderOverview({ order }) {
  const {
    name = "null",
    phoneNumber = "null",
    secondPhoneNumber = "null",
    fullAddress = "null",
    area = "null",
    village = "null"
  } = order?.shippingAddress;

  const paymentMethod = order?.paymentMethod
  const {
    _id = "null",
    createdAt = "null",
    orderStatus = "null",
    deliveryFees = "null",
    deliveryType = "null",
    totalCost = "null",
  } = order;


  return (
    <div className="border-gray-300 mb-2 text-slate-700  w-full">
      <OrderSummaryRow text="অর্ডার আইডি" value={_id} />
      <OrderSummaryRow text="সময়" value={createdAt} />
      <OrderSummaryRow text="অর্ডার" value={orderStatus} />
      <OrderSummaryRow text="ডেলিভারি ফি" value={`${deliveryFees} ৳`} />
      <OrderSummaryRow text="ডেলিভারি ধরন" value={deliveryType} />
      <OrderSummaryRow text="সর্বমোট" value={`${totalCost} ৳`} />
      <OrderSummaryRow text="পরিশোধের মাধ্যম" value={`${paymentMethod} `} />

      <h1 className="text-xl mt-5 font-bold mb-2">শিপিং অ্যাড্রেস</h1>
      <OrderSummaryRow text="নাম" value={truncateText(name, 15)} />
      <OrderSummaryRow text="ফোন নাম্বার" value={truncateText(phoneNumber, 14)} />
      <OrderSummaryRow text="ইমার্জেন্সি ফোন নাম্বার " value={truncateText(secondPhoneNumber, 14)} />
      <OrderSummaryRow text="এরিয়া" value={truncateText(area, 20)} />
      <OrderSummaryRow text="গ্রাম" value={truncateText(village, 25)} />
      <OrderSummaryRow text="পূর্ন ঠিকানা " value={truncateText(fullAddress , 35)} />
    </div>
  )
}
