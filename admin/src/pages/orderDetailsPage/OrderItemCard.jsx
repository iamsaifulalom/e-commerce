
import { Link } from 'react-router-dom'
import truncateText from "../../helper/truncateText"

export default function OrderItemCard({ item }) {

    return (
        <Link to={`/create-product?id=${item?._id}`}>
            <div className="w-full h-20  cursor-pointer border border-gray-300 mt-2 p-0.5 rounded overflow-hidden flex">
                <img src={item?.image} className="h-full border border-gray-200 rounded aspect-square object-cover" />
                <div className="w-full p-1">
                    <div className="flex justify-between w-full">
                        <h1 className="ml-2 text-sm font-bold">{truncateText(item?.title, 15)}</h1>
                        <h1 className="ml-2 text-sm font-bold">{item?.totalPrice} ৳</h1>
                    </div>
                    {/* ===== items size , colour and quantity */}
                    <div className="ml-2 text-xs mt-1 flex gap-1">
                        <span className="px-2 py-0.5 border border-gray-300 rounded-full">Size:{item?.size}</span>
                        {item?.colour && <span className="px-2 py-0.5 border border-gray-300 rounded-full">{item?.colour}</span>}
                        <span className="px-2 py-0.5 border border-gray-300 rounded-full">পরিমান {item?.quantity}</span>
                    </div>
                    <h1 className="text-[10px] mt-0.5 ml-2"> {`${truncateText(item?.seller?.name, 15)} (${item?.seller?.phoneNumber})`}</h1>
                </div>
            </div>
        </Link>
    )
}
