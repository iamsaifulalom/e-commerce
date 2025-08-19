import { FaShippingFast } from "react-icons/fa";
// import { MdVerifiedUser } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";

export default function Commitment() {
    return (
        <div className="mt-10 mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col items-center">
                <FaShippingFast className="w-16 h-16 text-white p-2 rounded-full border-8 border-gray-300 bg-slate-800" />
                <h1 className="text-lg">নির্দিষ্ট সময়ে অর্ডার ডেলিভারি</h1>
                <p className="text-sm -mt-1 text-gray-400">দ্রুত এবং নির্ভরযোগ্য ডেলিভারি</p>
            </div>
            <div className="flex flex-col items-center">
                <RiCustomerService2Fill className="w-16 h-16 text-white p-2 rounded-full border-8 border-gray-300 bg-slate-800" />
                <h1 className="text-lg"> কাস্টমার সার্ভিস</h1>
                <p className="text-sm -mt-1 text-gray-400">সার্বক্ষণিক বন্ধুত্বপূর্ণ কাস্টমার সাপোর্ট</p>
            </div>
            {/* <div className="flex flex-col items-center">
                <MdVerifiedUser className="w-16 h-16 text-white p-2 rounded-full border-8 border-gray-300 bg-slate-800" />
                <h1 className="text-lg">টাকা ফেরতের গ্যারান্টি</h1>
                <p className="text-sm -mt-1 text-gray-400">৭ দিনের মধ্যে টাকা ফেরত</p>
            </div> */}
        </div>
    )
}