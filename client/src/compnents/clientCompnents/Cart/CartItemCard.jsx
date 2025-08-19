import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import useCartStore from "../../../store/useCartStore";
import Counter from "../../clientCompnents/productDetailsPage/Counter"
import { AiOutlineDelete } from "react-icons/ai";
import truncateText from "../../../helper/truncateText";


export default function CartItemCard({ item }) {

    const removeItem = useCartStore(state => state.removeFromCart)
    const updateQuantity = useCartStore(state => state.updateQuantity)
    const [quantity, setQuantity] = useState(item?.quantity)
    const totlaWeight = ((item.weight / 1000) * quantity).toFixed(2)

    useEffect(() => {
        updateQuantity(item?._id, quantity)
    }, [quantity])

    return (

        <div className="flex h-24 border border-gray-300 rounded p-1 mb-2 gap-3 overflow-hidden">
            <Link to={`/product-details/${item._id}`}
                className="h-full aspect-square rounded border border-gray-300"
            >
                <img src={item?.image} className="w-full h-full object-contain" />
            </Link>
            <div className="w-full">
                {/* ===== price and title ====== */}
                <div className="flex w-full justify-between">
                    <h1 className="text-sm font-bold">
                        {truncateText(item?.title, 20)}
                    </h1>
                    <p className="text-sm">{item?.price * quantity}৳</p>
                </div>

                {/* selected colour and size */}
                <div className="flex items-center mt-2 text-xs gap-1 text-slate-700">
                    {item.colour && <p className="tag-badge">
                        {item.colour}
                    </p>}
                    {item.size && <p className="tag-badge">
                        {item.size}
                    </p>}
                    {item?.weight && <p className="tag-badge">
                        {totlaWeight} কেজি
                    </p>}
                </div>
                {/* ============ counter and delete button ==== */}
                <div className="flex gap-3 justify-between items-center">
                    <Counter sm quantity={quantity} setQuantity={setQuantity}  />
                    <div
                        onClick={() => removeItem(item?._id, item?.size, item?.colour)}
                        className="border w-[40%] text-xl -mb-1 cursor-pointer py-1 flex justify-center rounded-full text-red-500 border-red-400">
                        <AiOutlineDelete />
                    </div>
                </div>
            </div>
        </div>
    )
}
