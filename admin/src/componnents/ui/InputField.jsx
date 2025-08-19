import { useState } from "react"
import Label from "./Label"

export default function InputField({
    label,
    type = "text",
    onChange,
    placeholder,
    style,
    value,
    name,
    disabled = false,
    desireLentgh,
    exact = false,
    isValid = true,
    autoComplete = "on"
}) {

    const [length, setLength] = useState(11)

    function handleChanged(e) {
        setLength(e.target.value.length)
        onChange(e)
    }


    return (
        <div className={`w-full mt-2 text-lg relative ${style}`}>
            {label && <Label label={label} />}
            <input type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                autoComplete={autoComplete}
                disabled={disabled}
                onChange={handleChanged}
                className={`${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-gray-100 "} 
                block border w-full text-primary 
                      border-gray-800 px-3 py-1 
                      focus:outline-2 mt-1 rounded-full`} />
            {/* tool tip */}
            {desireLentgh && <div className={`absolute right-0 top-1 text-white text-xs bg-red-500 px-2 rounded ${length >= desireLentgh ? "hidden" : "block"}`}>
                {`${label} ${exact ? "" : "কমপক্ষে"} ${desireLentgh} অক্ষরের হতে হবে`}
            </div>}
            {isValid ? "" :
                <span className="absolute right-0 top-1 text-white text-xs bg-red-500 px-2 rounded">
                    {label}টি গ্রহনযোগ্য নয়
                </span>}
        </div>
    )
}