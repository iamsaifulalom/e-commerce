export default function SelectOptions({
    name,
    className,
    clearValue,
    label,
    defaultValue,
    options,
    onChange,
    hideMatchOne
}) {

    return (
        <div className="mt-2 text-lg">

            {label && <label className="mt-2 select-none ">{label}</label>}

            <select
                className={`w-full bg-gray-100 ${className}`}
                name={name}
                onChange={onChange}
                value={defaultValue}
            >

                {clearValue &&
                    <option value="">
                        {clearValue}
                    </option>}

                {options?.map(option => (
                    // don't render that option 
                    // which is equal of currect category name

                    hideMatchOne !== option?.name &&
                    <option
                        key={option?._id}
                        value={option?._id}>
                        {option?.name}
                    </option>

                ))
                }
            </select>
        </div>
    );
}