export default function SectionLabel({ label }) {

    return (
        <div className="flex items-center">
            <div className="h-10 w-3 border-2 border-orange-400 p-0.5">
                <div className="w-full h-full bg-orange-400"> </div>
            </div>
            <h1 className="text-orange-400 ml-3 text-sm">{label}</h1>
        </div>
    );
};