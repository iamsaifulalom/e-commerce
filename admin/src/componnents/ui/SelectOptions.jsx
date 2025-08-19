import Label from "./Label";

export default function SelectOptions({
    name,
    style,
    clearValue,
    label,
    defaultValue,
    options,
    onChange,
    hideMatchOne
}) {

    return (
        <div className="mt-2 text-lg">

            {label && <Label label={label} />}

            <select
                className={`w-full  rounded-full px-3 border py-2 bg-gray-100 ${style}`}
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