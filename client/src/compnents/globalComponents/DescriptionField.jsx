import { useEffect, useRef } from "react";

export default function DescriptionField({
    style,
    label,
    placeholder,
    name,
    value,
    onChange
}) {
    const textareaRef = useRef(null);

    function handleInput(e) {
        const element = e.target;
        element.style.height = 'auto'; // Reset first to shrink if needed
        element.style.height = `${element.scrollHeight}px`;
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <div className={`${style} mt-2 text-lg`}>
            {label && <label className="mt-2 select-none">{label}</label>}
            <textarea
                ref={textareaRef}
                onInput={handleInput}
                onChange={onChange}
                name={name}
                value={value}
                rows={3}
                placeholder={placeholder}
                className={`block bg-secondary border w-full text-primary 
                      border-secondary px-3 py-1 
                      focus:outline-2 rounded-2xl overflow-hidden outline-seborder-secondary`}
            />
        </div>
    );
}
