import { FaBoxOpen } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";

import SettingsOption from "../../globalComponents/SettingsOption";

const settingsItem = [
    { Icon: <AiOutlineClear />, text: "সাইন আউট", path: "/sign-out" },
    { Icon: <FaBoxOpen />, text: "অর্ডার লিস্ট", path: "/orders" },
]

export default function UserLoggedIn() {
    return (
        <>
            {settingsItem?.map(item => (
                <SettingsOption
                    key={item.path}
                    Icon={item.Icon}
                    text={item.text}
                    path={item.path} />
            ))}

        </>
    )
}