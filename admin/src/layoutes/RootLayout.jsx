import { Outlet } from 'react-router-dom';
import Header from "../componnents/common/Header"
import SideBar from '../componnents/common/SideBar';


export default function RootLayout() {

    return (
        <div>
            <Header />
            <div className="flex py-16">
                <SideBar />
                <main className="md:ml-[250px] flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
