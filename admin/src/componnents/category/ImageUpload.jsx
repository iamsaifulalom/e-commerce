import useRemoveImage from "../../hooks/useRemoveImage";
import useUploadSingleImage from "../../hooks/useUploadSingleImage";
import Toast from "../ui/Toast"

export default function ImageUpload({ image, setImage }) {

    const { publicId, url } = image;

    const {
        isLoading,
        error,
        setError,
        uploadImage
    } = useUploadSingleImage(setImage)
    const { isRemoving, error: rmErrr, removeImage } = useRemoveImage(setImage)

    return (
        <div className="w-full max-h-[400px] mt-5 flex justify-center items-center relative aspect-video overflow-hidden rounded p-2 border  border-gray-500">
            <Toast
                onClick={() => setError(null)}
                danger={true} message={error || rmErrr} />
            {isLoading && <p>Uploading...</p>}
            {!isLoading && !url &&
                <div>
                    <label htmlFor="category-image" className="text-sm border px-15 py-1.5 rounded-full w-full h-full block cursor-pointer"> Upload category image</label>
                    <input
                        type="file"
                        className="hidden"
                        id="category-image"
                        onChange={uploadImage}
                    />
                </div>}

            {url && <>
                <img src={url} className="w-full h-full rounded object-cover" />
                <span

                    onClick={() => removeImage(publicId)}
                    className="absolute bottom-5 cursor-pointer right-5 bg-red-600 text-white text-sm px-3 py-1 rounded">
                    {isRemoving ? "Removing..." : "Remove"}
                </span>
            </>}
        </div>
    );
}