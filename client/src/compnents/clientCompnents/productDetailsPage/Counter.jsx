import { useEffect, useState } from "react"
import { FaPlus, FaMinus } from "react-icons/fa";


export default function Counter({ setQuantity  , quantity ,sm = false }) {


    return (
        <div className={` border w-full text-orange-400 border-orange-400 flex 
             px-3 justify-around rounded-full text-sm 
            ${sm ? "w-[120px] mt-1" : " w-full"}`}>
            <button
                onClick={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)}
                className={`cursor-pointer ${sm ? "text-sm" : "text-xl "}`}>
                <FaMinus />
            </button>
            <span className={`text-slate-800 ${sm ? "text-lg" : "text-xl "}`}>{quantity}</span>
            <button
                onClick={() => setQuantity(p => p + 1)}
                className={`cursor-pointer ${sm ? "text-sm" : "text-xl "}`}>
                <FaPlus />
            </button>
        </div>
    )
};
