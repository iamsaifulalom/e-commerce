import { FaRegEdit } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";


export default function ShowProductVarinats({ product, setProduct, setVariant }) {

    function deleteVariant(variant) {
        setProduct(prev => {
            const updatedVariants = prev?.variants?.filter(v => v.size !== variant.size)
            return { ...prev, variants: updatedVariants }
        })
    }

    return (
        <>
            {product?.variants?.length > 0 &&
                <div className="p-3 mt-5 border rounded border-gray-300">
                    <h1 className="mb-2">Variants</h1>
                    {product?.variants?.map(v => (
                        <div key={v?.size} className="w-full gap-1 p-1 h-20 flex border mb-2 border-gray-300 rounded">
                            <div className="h-full flex justify-center items-center text-sm aspect-square border border-gray-300 rounded">
                                {v?.size}
                            </div>
                            <div className="w-full p-1 text-xs border rounded border-gray-300">
                                {v?.colour && <h1>Colours : {v?.colour} </h1>}
                                <div className="flex justify-between">
                                    <span>Weight : {v?.weight / 1000} kg</span>
                                    <span>Price :  {v.salePrice ? <>
                                        <span>{v?.salePrice}৳</span>
                                        <span className="text-[10px] ml-0.5 text-gray-400 line-through">{v?.regularPrice}৳</span>
                                    </> :
                                        <span>
                                            {v?.regularPrice}৳
                                        </span>}</span>
                                </div>
                                <div className="flex text-xs  gap-3">
                                    <span >Stock : {v?.stock}</span>
                                    <h1
                                        onClick={() => setVariant(p => ({ ...p, ...v }))}
                                        className="text-blue-600  rounded border px-1  cursor-pointer">Update</h1>
                                    <h1
                                        onClick={() => deleteVariant(v)}
                                        className="text-red-500 rounded border px-1 cursor-pointer ">Remove</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
};