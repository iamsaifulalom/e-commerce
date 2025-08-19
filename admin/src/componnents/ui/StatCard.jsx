export default function StatCard({ label, value, danger }) {
    return (
        <div className={`w-full h-full rounded px-6 py-2 
        ${danger ? "bg-red-300" : "bg-gray-200"}`}>
            <h1 className="text-xl font-bold">{label}</h1>
            <h3 className="text-2xl">{value}</h3>
        </div>
    );
}