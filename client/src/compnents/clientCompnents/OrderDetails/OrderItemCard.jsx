import { Link } from "react-router-dom"
import truncateText from "../../../helper/truncateText"

export default function OrderItemCard({ item }) {

    return (
        <Link to={`/product-details/${item?._id}`}>
            <div
                className="w-full h-24  cursor-pointer border border-gray-300 mt-2 p-0.5 rounded overflow-hidden flex">
                <img src={item?.image} className="h-full border border-gray-200 rounded aspect-square object-cover" />
                <div className="w-full p-1">
                    <div className="flex justify-between w-full">
                        <h1 className="ml-2 text-sm font-bold">
                            {truncateText(item?.title, 15)}
                        </h1>
                        <h1 className="ml-2 text-sm font-bold">{item?.totalPrice} ৳</h1>
                    </div>
                    {/* ===== items size , colour and quantity */}
                    <span className="tag-badge  ml-2">সাইজঃ {item?.size}</span>
                    <div className="ml-2 mt-1 flex gap-1">
                        <span className="tag-badge">পরিমান {item?.quantity}</span>
                        {item?.colour && <span className="tag-badge">কালারঃ {item?.colour}</span>}
                    </div>
                </div>
            </div>
        </Link>

    )
}
