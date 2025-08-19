import DropDown from "../side-bar/DropDown";
import SettingsOptions from "../side-bar/SettingsOptions";
import { createGlobalState } from "react-use"
export const useSideBarToggle = createGlobalState(false)


export default function SideBar() {

    const [isOpen, setIsOpen] = useSideBarToggle()
    return (
        <>
            <div className={`side-bar ${isOpen ? "left-0" : "-left-full"}`}>
                {/* ====== settings items ======== */}
                <SettingsOptions />
                {/* ====== create , product , category and user ======= */}
                <DropDown />

            </div>

            {/* overlay for hadnling out side click to close side bar */}
            <div
                onClick={() => setIsOpen(false)}
                className={`side-bar-overlay ${isOpen ? "left-0" : "-left-full"}`}></div>
        </>
    );
}