import { useState } from "react"

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
    isValid = true
}) {

    const [length, setLength] = useState(11)

    function handleChanged(e) {
        setLength(e.target.value.length)
        onChange(e)
    }


    return (
        <div className={`w-full mt-2 text-lg relative ${style}`}>
            {label && <label className="mt-2 select-none ">{label}</label>}
            <input type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                disabled={disabled}
                onChange={handleChanged}
                className={`${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-secondary "} block border w-full text-primary 
                      border-secondary px-4 py-1 
                      focus:outline-2 rounded-full`} />
            {/* tool tip */}
            {desireLentgh && <div className={`absolute right-0 top-1 text-xs bg-red-500 px-2 rounded ${length >= desireLentgh ? "hidden" : "block"}`}>
                {`${label} ${exact ? "" : "কমপক্ষে"} ${desireLentgh} অক্ষরের হতে হবে`}
            </div>}
            {isValid ? "" :
                <span className="absolute right-0 top-1 text-white text-xs bg-red-500 px-2 rounded">
                    {label}টি গ্রহনযোগ্য নয়
                </span>
            }
        </div>
    )
}