export default function PriceAndStock({variant , quantity = 1}) {
  return (
    <div className="flex justify-between pt-3 border-b border-gray-300 pb-3 items-center w-full">
                {variant?.salePrice ?
                    <div>
                        <span className="text-2xl mr-1">
                            {variant?.salePrice * quantity}৳
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                            {variant?.regularPrice * quantity}৳
                        </span>
                    </div> :
                    <span className="text-2xl mr-1">
                        {variant?.regularPrice * quantity}৳
                    </span>}

                {/* ========= stock ============ */}

                <div>
                    {variant?.stock > 0 ?
                        <span className="bg-green-200 text-sm px-4 rounded-full py-1 text-green-500 ">স্টক  আছে</span> :
                        <span className="bg-red-200 text-sm px-4 rounded-full py-1 text-red-500 "> স্টক নেই</span>}
                </div>
            </div>
  )
};
