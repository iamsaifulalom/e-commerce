import { Link } from "react-router-dom";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import Toast from "../ui/Toast"
import truncateText from "../../helper/truncateText"

export default function ProductCard({ product }) {

  const { image, title, regularPrice, salePrice, stock, _id } = product;
  const { error, setError, dltId, deleteProduct } = useDeleteProduct()

  return (
    <div className="w-full h-20 flex p-1 border border-gray-300 mt-2 rounded">
      <Toast danger={true} message={error} onClick={() => setError(null)} />
      <img src={image} className="h-full border border-gray-300 rounded aspect-square object-cover" />
      <div className="w-full pr-3 flex flex-col gap-3">
        {/*  ======================================
           title , saleprice and regular price
=========================================== */}
        <div className="ml-2 flex justify-between w-full">
          <h1>
            {truncateText(title , 15)}
          </h1>
          {salePrice > 0 ?
            <span>
              <span className="text-sm text-slate-800">{salePrice} ৳</span>
              <span className="text-xs text-gray-500 ml-2">{regularPrice} ৳</span>
            </span> :
            <span className="text-sm">{regularPrice} ৳</span>
          }
        </div>

        {/*  ======================================
           stock , and action button
=========================================== */}
        <div className="ml-2 text-sm flex gap-2">
          <p>Stock {stock}</p>
          <p className="text-blue-500 cursor-pointer">
            <Link to={`/create-product?id=${_id}`}>
              Update
            </Link>
          </p>
          <p

            onClick={() => deleteProduct(_id)}
            className="text-red-500 cursor-pointer">
            {dltId === _id ? "Deleting..." : " Delete"}
          </p>
        </div>
      </div>

    </div>
  );
}