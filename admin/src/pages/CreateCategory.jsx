import { useEffect, useState } from "react";
import ImageUpload from "../componnents/category/ImageUpload";
import InputField from "../componnents/ui/InputField"
import DescriptionField from "../componnents/ui/DescriptionField"
import SelectOptions from "../componnents/ui/SelectOptions"
import Button from "../componnents/ui/Button";
import useGetParantCategory from "../hooks/useGetParantCategory";
import useCreateCategory from "../hooks/useCreateCategory";
import Toast from "../componnents/ui/Toast";
import useFetchCategoryForUpdate from "../hooks/useFetchCategoryForUpdate";
import Loader from "../componnents/ui/Loader";
import useUpdateCategory from "../hooks/useUpdateCategory";


export default function CreateCategory() {

  // get parant categories
  const { categories } = useGetParantCategory()
  const { isCreating, message, createCategory, error } = useCreateCategory()

  // category image
  const [image, setImage] = useState({
    url: "",
    publicId: ""
  })

  const [categoryInfo, setCategoryInfo] = useState({
    name: "",
    description: "",
    isPromoted: "no",
    parent: null
  })


  // get category id for fetching full data and updating
  const { isGetting, error: duringFetch } = useFetchCategoryForUpdate({ setCategoryInfo, setImage })

  // update category
  const { isUpdating, updataCategory } = useUpdateCategory()

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "parent") {
      return setCategoryInfo(p => ({ ...p, [name]: value ? value : null }))
    }
    setCategoryInfo(p => ({ ...p, [name]: value }))
  }

  function hanleCategory() {
    if (categoryInfo?._id) {
      const catData = {
        image,
        ...categoryInfo
      }
      updataCategory(catData)
    } else {
      const categoryData = { image, ...categoryInfo }
      createCategory(categoryData)

    }
  }
 
  if (isGetting) return <Loader />

  return (
    <div className="max-w-xl mx-auto border p-4 border-gray-300 rounded">
      <h1 className="text-xl font-bold">Create category</h1>
      <Toast message={message} />
      <Toast danger={true} message={error} />
      <ImageUpload image={image} setImage={setImage} />
      <InputField
        name="name"
        label="Category name"
        placeholder="ইলেক্ট্রনিক্স"
        onChange={handleChange}
        value={categoryInfo.name}
      />
      <DescriptionField
        name="description"
        placeholder="স্মার্টফোন, ফিচার ফোন এবং এর সাথে সম্পর্কিত সরঞ্জাম যেমন - চার্জার, হেডফোন, পাওয়ার ব্যাংক, মেমোরি কার্ড, মোবাইল কভার ইত্যাদি।"
        label="Description"
        onChange={handleChange}
        value={categoryInfo?.description}
      />

      {/*  get info is it a promoted category or not */}
      <SelectOptions
        name="isPromoted"
        style="rounded-full px-2 py-1"
        options={[
          { name: "no", _id: "no" },
          { name: "yes", _id: "yes" }
        ]}
        label="Is it featured category"
        defaultValue={categoryInfo.isPromoted}
        onChange={handleChange}
      />

      <SelectOptions
        clearValue="No parent"
        name="parent"
        hideMatchOne={categoryInfo?.name}
        style="rounded-full px-2 py-1"
        options={categories}
        label="Parent category"
        defaultValue={categoryInfo?.parent?._id}
        onChange={handleChange}
      />

      {/* ===== button ====== */}
      <Button variant="primary"
        isLoading={isCreating || isUpdating}
        text="Save category"
        style="w-full mt-5"
        onClick={hanleCategory}
      />
    </div>
  );
}