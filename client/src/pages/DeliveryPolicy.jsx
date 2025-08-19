import { FaShippingFast } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

export default function DeliveryPolicy() {
    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold flex gap-3 items-center text-gray-800 mb-4">
                <FaShippingFast /> ডেলিভারি নীতি
            </h2>

            <p className="text-gray-700 mb-2">
                আমাদের অর্ডার গ্রহণের সময়সূচি: <span className="font-semibold text-blue-600">প্রতিদিন সকাল ১০টা থেকে বিকেল ৬টা পর্যন্ত</span>।
            </p>

            <p className="text-gray-700 mb-2">
                যদি কোনো অর্ডার <span className="font-semibold text-green-600">বিকেল ৬টার মধ্যে</span> করা হয়, তাহলে অর্ডারটি <span className="font-semibold text-green-600">সেই দিনের নির্দিষ্ট সময়ে ডেলিভারি</span> দেওয়া হবে।
            </p>

            <p className="text-gray-700">
                <span className="font-semibold text-red-600">বিকেল ৬টার পর (৬:০১ বা তার পরে)</span> করা অর্ডারগুলো <span className="font-semibold text-red-600">পরের দিন ডেলিভারি</span> দেওয়া হবে।
            </p>

            {/* Delevery area */}
            <h2 className="text-xl mt-5 font-bold flex gap-3 items-center text-gray-800 mb-4">
                <MdLocationPin />  ডেলিভারি এরিয়া
            </h2>

            {/* deliver area */}
            <ol className="list-inside">
                <h1 className="text-lg" >জকিগঞ্জ</h1>
                <h1 className="text-lg" >ঈদগাহ বাজার</h1>
            </ol>
        </div>
    )
}
