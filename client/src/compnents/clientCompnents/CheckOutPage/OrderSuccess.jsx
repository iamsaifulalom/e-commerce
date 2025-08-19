import { useWindowSize } from "react-use";
import { FaRegCheckCircle } from "react-icons/fa";
import Button from "../../globalComponents/Button";
import { useNavigate } from "react-router-dom";


export default function OrderSuccess({ data }) {
    const { height } = useWindowSize();

    const navigate = useNavigate()

    function handleClick() {
        const orderId = data?.orderId;
        navigate(`/order/${orderId}`)
    }

    return (
        <div
            style={{ height: height ? height - 140 : "100vh" }}
            className="w-full flex justify-center  items-center"
        >
            <div className="flex w-[300px] flex-col items-center">
                <FaRegCheckCircle className="text-orange-400" size={50} />
                {/* Replace with real success message or summary */}
                <h2 className="heading mt-2">আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h2>
                <p className="text-gray-600 -mt-5">ধন্যবাদ, আমাদের সাথে থাকার জন্য।</p>
                <Button onClick={handleClick} text="অর্ডার ট্রাক করুন" variant="primary" style="mt-5 w-full" />
            </div>
        </div>
    );
}

