import { FaBoxOpen } from "react-icons/fa6";
import SettingOption from "../ui/SettingOption";
import { FaUsers } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineReceiptLong } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";


const optionsData = [
  { text: "Sign out", Icon: <PiSignOutBold />, path: "/sign-out" },
  { text: "Dashboard", Icon: <MdHomeFilled />, path: "/" },
  { text: "Orders", Icon: <MdOutlineReceiptLong />, path: "/orders" },
  { text: "Products", Icon: <FaBoxOpen />, path: "/products" },
  { text: "Categories", Icon: <BiSolidCategory />, path: "/categories" },
  { text: "Users", Icon: <FaUsers />, path: "/users" },
]


export default function SettingsOptions() {
  return (
    <>
      {optionsData?.map(item => (
        <SettingOption key={item?.text} style="text-xl" item={item} />
      ))}
    </>
  );
}