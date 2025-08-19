import { Link } from "react-router-dom"

export default function ProductCard({product}) {

    return (
        <Link to={`/product-details/${product?._id}`}>
            <div className="rounded border-2 p-1 border-gray-200 w-full bg-white">
                <img src={product?.image} alt=""
                    className="w-full aspect-square object-cover rounded" />
                <h2 className="text-sm line-clamp-2  min-h-[2.5rem]">
                    {product.title}
                </h2>

                {/* pricing ................ */}
                <div className="flex justify-between mt-2">
                    {product?.salePrice ?
                        <div>
                            <span className="text-sm pr-1">{product?.salePrice}৳</span>
                            <span className="text-xs text-gray-400 line-through">{product?.regularPrice}৳</span>
                        </div> :
                        <span className="text-sm">{product?.regularPrice}৳</span>}
                    {/* stock ============== */}
                    {product?.stock > 0 ?
                        <span className="text-right text-[10px] rounded text-green-500 bg-green-100 px-2 py-1">
                           স্টক আছে
                        </span> :
                        <span className="text-right text-[10px] rounded text-red-500 bg-red-100 px-2 py-1">
                            স্টক নেই
                        </span>}
                </div>
            </div>
        </Link>
    )
};
