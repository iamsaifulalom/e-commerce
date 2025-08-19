import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

export default function SearchBar({ baseUrl }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerms, setSearchTerms] = useState("");
    const [searchParams] = useSearchParams()


    // acces search parms so that use can easyly remove query
    useEffect(() => {
        const value = searchParams.get("q")
        setSearchTerms(value || "")
    }, [searchParams])

    // handle search icon click
    function handleSearch() {
        if (searchTerms) {
            navigate(`${baseUrl}?q=${searchTerms?.trim()}`);
        }
    }

    function handleClear() {
        setSearchTerms("")
        if (location.pathname === baseUrl && !searchTerms) {
            navigate(baseUrl);
        }
    }

    return (
        <div className="w-full print:hidden text-slate-800 flex">
            <div className="w-full relative">
                <input
                    type="text"
                    placeholder="খুজুন..."
                    className="w-full text-lg bg-white pl-5 py-1 pr-8 rounded-l-full"
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                {searchTerms && <FaXmark size={20} onClick={handleClear} className="absolute right-2 top-1/2 -translate-y-1/2" />}
            </div>



            {/* search icon */}
            <div onClick={handleSearch}
                className="bg-orange-400 text-slate-800 cursor-pointer px-2 text-2xl 
                flex justify-center items-center rounded-r-full" >
                <CiSearch />
            </div>
        </div>
    );
}
