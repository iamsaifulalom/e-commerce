import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaRegCircleXmark } from "react-icons/fa6";


export default function Toast({ danger = false, message, onClick }) {

    return (
        <>
            {message && <div
                onClick={onClick}
                className={`${danger ? "bg-red-500" : "bg-green-500"} 
                           fixed top-20 right-5 transform text-white text-sm
                            py-3 px-6 pl-10 rounded-md shadow-lg z-50 transition-all`}>
                {message}
                {danger ? < FaRegCircleXmark

                    className="left-3 text-xl cursor-pointer absolute top-1/2 -translate-y-1/2" /> :
                    < IoCheckmarkDoneCircle className="left-3 text-xl cursor-pointer absolute top-1/2 -translate-y-1/2" />
                }
            </div>}
        </>
    );
}