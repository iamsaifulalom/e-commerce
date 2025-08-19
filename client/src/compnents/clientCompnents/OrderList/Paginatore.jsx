import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";


export default function Paginatore({ page, hasMore , setPage }) {

    return (
        <div className="text-xl justify-between flex items-center gap-1 font-bold px-1 py-0.5 border mt-2 rounded-full">
            <button
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1}
                className={`${page === 1 ? "opacity-25 cursor-not-allowed" : "cursor-pointer"}`}>
                <CiCircleChevLeft size={30} />
            </button>
            <span>পেজ {page}</span>
            <button
                onClick={() => setPage(p => p + 1)}
                disabled={!hasMore}
                className={`${!hasMore ? "opacity-25 cursor-not-allowed" : "cursor-pointer"}`}>
                <CiCircleChevRight size={33} />
            </button>
        </div>
    );
}