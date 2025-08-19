import { GoHomeFill } from "react-icons/go";
import { FaOpencart } from "react-icons/fa";
import { useState } from "react";
import { FaShop , FaBarsStaggered} from "react-icons/fa6";
import MobileNavItem from "./MobileNavItem";
import { TbCategory } from "react-icons/tb";
import { useSideBarToggle } from "./SideBar";

const sidebarItems = [
    { Icon: <GoHomeFill />, path: "/", text: "হোম" },
    { Icon: <FaShop />, path: "/shop", text: "শপ" },
    { Icon: <TbCategory />, path: "/categories", text: "ক্যাটাগরি" },
    { Icon: <FaOpencart />, path: "/cart", text: "কার্ট" },
    { Icon: <FaBarsStaggered />, path: "/more", text: "আরো" },
];

export default function MobileNav() {

    const [_, setIsOpen] = useSideBarToggle()
    const [clickedItemText, setClickedItemText] = useState("হোম");

    function handleClick(text) {
        setClickedItemText(text)
        if (text === "আরো") {
            setIsOpen(p => !p)
        } else {
            setIsOpen(false)
        }
    }

    return (
        <div className="w-full z-50 fixed bottom-0 text-2xl md:hidden bg-slate-800 text-white left-0 h-16 flex justify-around items-center">

            {sidebarItems.length > 0 && sidebarItems.map(item => (
                <MobileNavItem
                    clickedItemText={clickedItemText}
                    key={item?.text}
                    item={item}
                    onClick={handleClick}
                />
            ))}
        </div>
    );
}
