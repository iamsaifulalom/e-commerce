import { useState } from "react";
import OrderSummery from "../compnents/clientCompnents/CheckOutPage/OrderSummery";
import ShipingAddress from "../compnents/clientCompnents/CheckOutPage/ShipingAddress";
import Button from "../compnents/globalComponents/Button";
import Toast from "../compnents/globalComponents/Toast";
import useCartStore from "../store/useCartStore";
import { usePlaceOrder } from "../hooks/useOrder";
import DeliveryOptions from "../compnents/clientCompnents/CheckOutPage/DeliveryOptions";
import CalculateDeliverCostFromWeight from "../helper/CalculateDeliverCostFromWeight";
import OrderSuccess from "../compnents/clientCompnents/CheckOutPage/OrderSuccess";
import { Navigate } from "react-router-dom";

export default function CheckOutPage() {

  const totalWeight = useCartStore(state => state.totalWeight)

  //user chosen cart item/s
  const cart = useCartStore(state => state.backendCart)

  //shiping address
  const [shippingAddress, setShippingAddress] = useState({})

  // selected delivery option 
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState({
    name: "রেগুলার", cost: CalculateDeliverCostFromWeight(totalWeight), duration: "৪ ঘন্টা"
  })

  const { isLoading, error, data, setError, placeOrder } = usePlaceOrder()

  const order = {
    cart,
    shippingAddress,
    deliveryOption: selectedDeliveryOption
  }

  if (data) return <OrderSuccess data={data} />

  if (!localStorage.getItem("authToken")) return <Navigate to="/sign-in" />

  return (
    <div className="p-4 select-none max-w-xl mx-auto">
      <h1 className="heading">চেকআউট পেজ</h1>
      <Toast onClick={() => setError(null)} message={error} danger={true} />
      <ShipingAddress
        setShippingAddress={setShippingAddress} />
      {/* ============ delivery option ========== */}
      <DeliveryOptions
        selectedDeliveryOption={selectedDeliveryOption}
        setSelectedDeleveryOption={setSelectedDeliveryOption}
      />
      <OrderSummery
        deliveryCost={selectedDeliveryOption?.cost}
      />
      <Button
        onClick={() => placeOrder(order)}
        text={isLoading ? "অপেক্ষা করুন..." : "অর্ডার করুন"}
        variant="primary"
        style="w-full mt-5"
      />
    </div>
  )
}
