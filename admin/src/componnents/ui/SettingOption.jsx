import { Link } from "react-router-dom";
import {useSideBarToggle} from "../common/SideBar"

export default function SettingOption({ item, style }) {
    const [_, setIsOpen] = useSideBarToggle()
    return (
        <Link to={item.path}>
            <div onClick={()=> setIsOpen(false)} className={`settings-option ${style}`}>
                <div className="flex items-center gap-3 cursor-pointer">
                    {item?.Icon}
                    <p>
                        {item?.text}
                    </p>
                </div>
            </div>
        </Link>
    );
}