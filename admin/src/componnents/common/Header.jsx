import { FaBarsStaggered } from "react-icons/fa6";
import { useSideBarToggle } from "./SideBar";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


export default function Header() {
  const [_, setIsOpen] = useSideBarToggle()
  return (
    <div className="w-full select-none h-16 px-4 z-50 text-white text-2xl justify-between  bg-slate-800 fixed top-0 left-0 flex items-center">
      <div className="flex items-center gap-3">
        <MdOutlineAdminPanelSettings />
        <h1>Admin</h1>
      </div>
      <FaBarsStaggered className="cursor-pointer md:hidden" onClick={() => setIsOpen(p => !p)} />
    </div>
  )
}
