import { useNavigate } from "react-router-dom"
import useCartStore from "../../store/useCartStore"

export default function MobileNavItem({ item, onClick, clickedItemText }) {


    const totalQnt = useCartStore(state => state.totalItems)
    const navigate = useNavigate()

    function handleClick() {
        
        if (item?.text === "আরো") {
            return onClick(item?.text)
        } else {
            navigate(item?.path)
            // here this onclick event as a funtion which sent text 
            // for compareing clickedItemText
            onClick(item?.text)
        }

    }

    return (
        <div
            onClick={handleClick}
            className={`flex select-none flex-col px-4 py-1 rounded items-center relative cursor-pointer
             ${clickedItemText === item?.text ? "bg-orange-400" : ""}`}>

            {/* ============================
                nav bar item icon 👇
            =============================== */}
            {item.Icon}
            {/* ============================
                nav bar item text 👇
            =============================== */}
            <p className="text-xs"> {item.text}</p>

            {/*
            ================================
            check if it's cart ,if  it's show
            tolltip for tatal quantity 
            ================================
            */}
            {item?.text !== "কার্ট" ?
                null :
                totalQnt > 0 &&
                <span className="absolute -top-5 text-sm py-0.5 px-2 rounded bg-red-500 ">
                    {totalQnt}
                </span>}
        </div>
    )

};
