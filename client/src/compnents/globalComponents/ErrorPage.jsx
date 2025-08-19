import { useRouteError, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleTryAgain = () => {
        navigate("/"); 
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="text-center p-10">
                <h1 className="text-xl font-bold text-red-600"><span className="text-4xl">অ</span>হঃ...😔</h1>
                <p className="mb-2">অপ্রত্তাশিত সমস্যার জন্য আন্তরিকভাবে দুঃখিত।</p>
                <Button
                    onClick={handleTryAgain}
                    text="আবার চেষ্টা করুন"
                    variant="primary" />
            </div>
        </div>
    );
}

