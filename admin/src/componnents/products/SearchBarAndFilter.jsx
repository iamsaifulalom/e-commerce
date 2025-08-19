import { useState } from "react";
import InputField from "../ui/InputField";
import SelectOptions from "../ui/SelectOptions";
import { IoIosSearch } from "react-icons/io";
import { useEffect } from "react";

export default function SearchBarAndFilter({ placeholder, onChange, options, clearValue, setSearchTerm }) {
    const [qury, setQury] = useState("")

    useEffect(() => {
        if (!qury) setSearchTerm("")
    }, [qury])




    return (
        <div className="w-full grid gap-2 grid-cols-4">
            <SelectOptions
                style="border rounded-full border-gray-600"
                clearValue={clearValue}
                options={options}
                onChange={onChange}
            />
            <div className="relative  col-span-3">
                <InputField
                    onChange={(e) => setQury(e.target.value)}
                    placeholder={placeholder}
                />
                <div onClick={() => setSearchTerm(qury)}
                    className={`absolute h-[calc(100%-17px)]  cursor-pointer
                     bg-orange-400 px-3 text-xl flex font-bold items-center text-white bottom-[5.6px] right-1 rounded-full`}>
                    <IoIosSearch />
                </div>
            </div>

        </div>
    )
}
