export default function ColourSelector({ colours, selectedColour, setSelectedColour }) {


    return (
        <>
            {colours.length > 0 &&
                <div>
                    <p className=" py-0.5 select-none mt-3 text-slate-700">
                        কালারঃ
                    </p>
                    <div className="flex gap-2 border-b border-gray-300 pb-2 flex-wrap items-center">

                        {colours.map((c, i) => (
                            <p
                                onClick={() => setSelectedColour(c)}
                                className={`cursor-pointer px-4 py-0.5 border text-primary rounded-full 
                                ${selectedColour === c ? "bg-orange-200 border-orange-400" : ""}`}
                                key={i}>
                                {c}
                            </p>
                        ))}
                    </div>
                </div>}
        </>
    )
};