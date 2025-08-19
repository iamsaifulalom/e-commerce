import { Link } from "react-router-dom";
import useDeleteCategory from "../../hooks/useDeleteCategory"
import Toast from "../ui/Toast"
import { useState } from "react";


export default function CategoryCard({ category }) {
    const [isCopied, setIsCopied] = useState(false)
    const { isDeleting, error, setError, deleteCategory } = useDeleteCategory()

    const ParentId = category?._id;

    async function copyToClipBoard() {
        try {
            await navigator.clipboard.writeText(ParentId)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 1500);
        } catch (error) {
            console.log(error)
            setError("Somthing went wrong!")
        }
    }


    return (
        <>
            <Toast danger={true} message={error} onClick={() => setError(null)} />
            <div className="w-full select-none p-1 flex gap-2 h-20 border mt-2 rounded border-gray-500">
                <div className="h-full aspect-video border border-gray-500 rounded">
                    <img src={category?.image?.url} className="h-full aspect-video object-cover" />
                </div>
                <div className="text-sm">
                    <h1 className="font-bold">{category?.name}</h1>
                    <div className="flex gap-2">
                       {!category?.parent && <h1>Promoted : {category?.isPromoted}</h1>}
                        {!category?.parent &&
                            <h1 className="border cursor-pointer text-xs rounded ml-2 px-1" onClick={copyToClipBoard}>
                                {isCopied ? "Copied" : "Copy ID"}
                            </h1>}
                    </div>
                    <div className="flex text-xs mt-1 gap-2">
                        <h1 className="text-blue-600  rounded border px-1  cursor-pointer">
                            <Link to={`/create-category?id=${category?._id}`}>
                                Update
                            </Link>
                        </h1>
                        <h1
                            onClick={() => deleteCategory(category?._id)}
                            className="text-red-600  rounded border px-1  cursor-pointer">
                            {isDeleting ? "Deleting..." : "Delete"}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
}