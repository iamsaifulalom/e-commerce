import { useState } from "react";
import InputField from "./InputField";

export default function PasswordField({ value, onChange, label, desireLentgh, style }) {
    const [isShow, setIsShow] = useState(false)

    return (
        <>
            <InputField
                style={style}
                desireLentgh={desireLentgh}
                type={isShow ? "text" : "password"}
                name={"password"}
                placeholder={"******"}
                label={label || "পাসওয়ার্ড"}
                value={value}
                autoComplete="off"
                onChange={onChange} />

            <div className="mt-2">
                <input type="checkbox" id="checkbox" onChange={() => setIsShow(prev => !prev)} />
                <label htmlFor="checkbox" className="ml-2  text-slate-800 text-sm">Show password</label>
            </div>
        </>
    )
}