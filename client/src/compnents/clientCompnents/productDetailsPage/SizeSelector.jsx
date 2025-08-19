export default function SizeSelector({ sizes, selectedSize, setSize }) {
    return (
        <>
            <p className=" py-0.5 select-none mt-3 text-slate-700">
                সাইজঃ
            </p>
            <div className="flex select-none border-b border-gray-200 pb-2 gap-2  flex-wrap items-center">


                {sizes?.map((v, i) => (
                    <p key={i}
                        onClick={() => setSize(v)}
                        className={`cursor-pointer px-4 py-0.5 border text-slate-700 rounded-full 
                       ${selectedSize?.size === v?.size ? "bg-orange-200 border-orange-400" : ""}`}>
                        {v?.size}
                    </p>
                ))}
            </div>
        </>
    )
};
