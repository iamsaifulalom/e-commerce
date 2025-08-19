import { Outlet } from "react-router-dom"
import ClientHeader from "../compnents/globalComponents/ClientHeader"
import MobileNav from "../compnents/globalComponents/MobileNab"
import SideBar from "../compnents/globalComponents/SideBar"

export default function ClientLayout() {

  return (
    <div>
      <ClientHeader />
      <div className="py-16">
        <Outlet />
      </div>
      <SideBar/>
      <MobileNav/>
    </div>
  )
};
