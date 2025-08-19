import useUploadImages from "../../hooks/useUploadImages";
import { FaPlus } from "react-icons/fa6";
import Toast from "../ui/Toast"
import useRemoveImg from "../../hooks/useRemoveImg";
export default function UploadImages({ images, setImages }) {
    const {
        isUploading,
        lenght,
        uploadImgs,
        error,
        setError
    } = useUploadImages(setImages)


    const { 
        removingImgId, 
        removeImage 
    } = useRemoveImg({ setError, setImages })

    return (
        <div className="gap-2 border p-4 rounded border-gray-300 w-full grid grid-cols-3 md:grid-cols-4">

            <Toast
                onClick={() => setError(null)}
                message={error} danger={true}
            />

            {/* here show images */}
            {images?.length > 0 &&
                images?.map(img => (
                    <div className="relative border rounded p-1 h-30 " key={img?.publicId}>
                        <img src={img?.url} className="w-full rounded object-cover h-full" />
                        <p
                            onClick={() => removeImage(img?.publicId)}
                            className="absolute cursor-pointer rounded bottom-2 right-2 bg-red-500 text-white px-3 py-1 text-sm">
                            {removingImgId === img?.publicId ? "Removing..." : "Remove"}
                        </p>
                    </div>
                ))
            }

            {isUploading && new Array(lenght).fill(null)
                .map((_, i) => (
                    <div
                        key={i}
                        className="h-30  bg-gray-200 animate-pulse rounded flex justify-center items-center">
                    </div>
                ))
            }

            <div className="border h-30  rounded flex justify-center items-center">
                <label htmlFor="images" className="w-full cursor-pointer h-full flex justify-center items-center">
                    <FaPlus size={30} />
                </label>
                <input
                    type="file"
                    multiple
                    id="images"
                    className="hidden"
                    onChange={uploadImgs}
                />
            </div>
        </div>
    );
}