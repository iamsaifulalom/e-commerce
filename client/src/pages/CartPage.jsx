import Button from "../compnents/globalComponents/Button"
import CartItemCard from "../compnents/clientCompnents/Cart/CartItemCard"
import useCartStore from "../store/useCartStore"
import { useNavigate } from "react-router-dom"

export default function CartPage() {

  const cartItems = useCartStore(state => state.cart)
  const totalPrice = useCartStore(state => state.totalPrice)
  const navigate = useNavigate()

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="heading mb-3">কার্ট আইটেমস</h1>

      {/* ========= if cart lennth is greater than 0 
      then just render cart items other wise no ====== */}
      {cartItems?.length > 0 ?
        cartItems.map((item ,i)=> (<CartItemCard key={i} item={item} />)) :
        <h1 className="text-center">কার্টে কোন পণ্য নেই।</h1>
      }

      {/* Total cost of all products */}
      {totalPrice > 0 &&
        <h1 className="text-lg text-right">মোট {totalPrice}৳</h1>
      }

      {/* ========= if cart lennth is greater than 0 
      then just render button other wise no ====== */}
      {cartItems?.length > 0 ?
        <Button
          onClick={() => navigate("/check-out")}
          style="w-full mt-5"
          text="চেক আউটে যান"
          variant="primary"
        /> : null}

    </div>
  )
};
