import { FaPlus ,FaBoxOpen ,FaUserPlus}  from "react-icons/fa6";
import { RiArrowDropDownLine ,RiArrowDropUpLine} from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { useState } from "react";
import SettingOption from "../ui/SettingOption";

const optionsData = [
    { text: "Product", Icon: <FaBoxOpen />, path: "/create-product" },
    { text: "Category", Icon: <TbCategoryPlus />, path: "/create-category" },
    { text: "User", Icon: <FaUserPlus />, path: "/create-user" },
]

export default function DropDown() {
    const [isShow, setIsShow] = useState(false)

    return (
        <div>
            <div
                onClick={() => setIsShow(p => !p)}
                className="settings-option text-xl justify-between">
                <div className="flex justify-between items-center gap-2">
                    <FaPlus /> <h1>Create </h1>
                </div>
                {isShow ? <RiArrowDropUpLine /> : <RiArrowDropDownLine/>}

            </div>

            {/* ===== options ====== */}
            <div className={`${isShow ? "block" : "hidden"} pl-6 transition-all duration-200`}>
                {optionsData?.map(option => (
                    <SettingOption key={option.text} style="text-sm" item={option} />
                ))}
            </div>
        </div>
    );
}