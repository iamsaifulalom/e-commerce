import { useState } from "react";
import UploadImages from "../componnents/createProduct/UploadImages";
import Button from "../componnents/ui/Button";
import ProductForm from "../componnents/createProduct/ProductForm";
import ProductVariants from "../componnents/createProduct/ProductVariants";
import useCreateProduct from "../hooks/useCreateProduct";
import Toast from "../componnents/ui/Toast";
import useGetProductDetails from "../hooks/useGetProductDetails";
import updateProduct from "../hooks/updateProduct";
import Seller from "../componnents/createProduct/Seller";

export default function CreateProduct() {

  const [images, setImages] = useState([])
  const [productInfo, setProductInfo] = useState({
    title: "",
    keywords: "",
    isFeatured: "no",
    description: "",
    category: "",
    variants: []
  })

  // custom hooks to create product
  const {
    error,
    setError,
    isCreating,
    createProduct
  } = useCreateProduct()

  // this custom hooks grab product id
  // from search params and get products detals
  useGetProductDetails({
    setError,
    setImages,
    setProductInfo
  })

  // this hooks for updating products
  const { isUpdating, updata } = updateProduct({ setError })


  function handleCreateProduct() {
    const productData = {
      images,
      ...productInfo
    }

    // check if id is available 
    // if avaiable then call update
    // endpoint

    if (productInfo?._id) {
      updata(productData)
    } else {
      createProduct(productData)
    }
  }

  return (
    <div className="max-w-lg w-full mx-auto">
      <Toast
        onClick={() => setError(null)}
        danger={true} message={error}
      />
      <h1 className="text-xl mb-3 font-bold">Create product</h1>
      <UploadImages
        images={images}
        setImages={setImages}
      />

      <ProductForm
        productInfo={productInfo}
        setProductInfo={setProductInfo}
      />
      <Seller
        setProductInfo={setProductInfo}
        sellerId={productInfo?.seller}
      />
      <ProductVariants
        setProduct={setProductInfo}
        product={productInfo}
      />
      <Button
        isLoading={isCreating || isUpdating}
        variant="primary"
        text="Save product"
        onClick={handleCreateProduct}
      />
    </div>
  );
}