import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { useSideBarToggle } from "./SideBar";

export default function SettingsOption({ path, text, Icon }) {
    const [_, setIsOpen] = useSideBarToggle()
    const navigate = useNavigate()

    function handleClick() {
        setIsOpen(false)
        if (!path) return
        if (path === "/sign-out") {
            localStorage.removeItem("authToken")
            return
        }
        navigate(path)
    }

    return (
        <>
            <div
                onClick={handleClick}
                className="settings-option">
                <div className="flex  items-center text-white gap-3">
                    {Icon}
                    {text}
                </div>
                <IoIosArrowForward />
            </div>
        </>

    )
}

