import CalculateDeliverCostFromWeight from "../../../helper/CalculateDeliverCostFromWeight"
import useCartStore from "../../../store/useCartStore"


export default function DeliveryOptions({ selectedDeliveryOption, setSelectedDeleveryOption }) {

    const totalWeight = useCartStore(state => state.totalWeight)

    const deliveryOptionsData = [
        { name: "রেগুলার", cost: CalculateDeliverCostFromWeight(totalWeight), duration: "২ ঘন্টা" },
        { name: "এক্সপ্রেস", cost: CalculateDeliverCostFromWeight(totalWeight) + 20, duration: "১ ঘন্টা" }
    ]


    return (
        <div className="p-4 border mt-5 rounded mb-5">
            <h1 className="heading mb-3">ডেলিভারি অপশন</h1>
            {/* ========== total cost and weight ======= */}
            <h1 className="mb-3 font-bold">
                সকল পণ্যের ওজন
                <span className="text-orange-400 px-2">
                    {totalWeight.toFixed(2)}
                </span>
                কেজি
            </h1>

            {/* =========== deliver options ========== */}
            {deliveryOptionsData?.map(option => (
                // this is wraper div statrt
                <div key={option.name}
                    onClick={() => setSelectedDeleveryOption(option)}
                    className={`p-2 border border-gray-300 flex gap-1 items-center cursor-pointer rounded last:mt-2 
                   ${option.name === selectedDeliveryOption?.name ? "bg-blue-100 " : ""}`}>

                    {/* ======== this div is for circle ========= */}
                    <div className={`h-4 aspect-square border-2 border-blue-300 rounded-full 
                        ${option.name === selectedDeliveryOption?.name ? "bg-blue-600 " : ""}`}></div>

                    {/*  ========= this div contain information about delivery option */}
                    <div >
                        <p className="text-lg ">{option.name}</p>
                        <span className="px-2 text-sm py-0.5 border-gray-300 border mr-2 rounded-full">
                            ডেলিভারি ফিঃ {option.cost} ৳
                        </span>
                        <span className="px-2 text-sm py-0.5 border-gray-300 border rounded-full"> সময় {option.duration}</span>
                    </div>
                </div>))}

        </div>
    )
}
