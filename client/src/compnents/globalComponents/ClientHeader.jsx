import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import NavBar from "../clientCompnents/headers/Navbar";
import { FaOpencart } from "react-icons/fa";
import useCartStore from "../../store/useCartStore";
import { useSideBarToggle } from "../globalComponents/SideBar"

export default function ClientHeader() {
    const [_, setIsOpen] = useSideBarToggle()

    const navigate = useNavigate()
    const totalItems = useCartStore(state => state.totalItems)

    return (
        <div className="flex z-50 fixed top-0 left-0 w-full justify-between px-4 items-center h-16 bg-slate-800 text-white">

            {/* ======== company name with navigacion to home page ====== */}

            <Link to="/" className="h-full py-3.5">
                <img src="/images/app-logo.png" className="h-full rounded aspect-square" />
            </Link>

            {/* =========== nav links, search bar and cart icon ===== */}
            <div className="w-[80%] md:w-[80%] flex justify-between items-center">
                {/*navigation links for large screen 👇 */}
                <div className="hidden md:block w-[50%] overflow-hidden mr-5  max-w-[400px]">
                    <NavBar setIsOpen={setIsOpen} />
                </div>

                {/* =========== search bar and cart icon */}
                <div className="flex w-full md:w-[50%]">
                    {/* ========= search bar ========= */}
                    <div className=" w-full overflow-hidden md:mr-5">
                        <SearchBar baseUrl="/shop" />
                    </div>

                    {/* ====== cart icon for large screen ========= */}
                    <div
                        onClick={() => navigate("/cart")}
                        className="hidden md:flex relative cursor-pointer md:relative w-[5%] max-w-[40px] items-center justify-center">
                        <FaOpencart size={25} />

                        <span className="absolute -bottom-6 left-0 bg-red-500 text-sm rounded px-2 py-1">
                            {totalItems}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};
