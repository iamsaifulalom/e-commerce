import { useEffect, useState } from "react";
import SelectOptions from "../ui/SelectOptions"
import Toast from "../ui/Toast"
import useGetParantCategory from "../../hooks/useGetParantCategory";
import useGetChildCategories from "../../hooks/useGetChildCategories";

export default function Category({ setProduct }) {

  const [parentCategory, setParentCategory] = useState("");
  const { categories, error } = useGetParantCategory()

  const {
    error: toGetChild,
    data: Child,
  } = useGetChildCategories(parentCategory)


  function handleChange(e) {
    const { name, value } = e.target;
    setProduct(p => ({ ...p, [name]: value }))
  }


  return (
    <div>
      <Toast danger={true} message={error || toGetChild} />
      <SelectOptions
        style="px-3 py-1.5 rounded-full"
        label="Main category"
        options={categories}
        clearValue="Select one"
        onChange={(e) => setParentCategory(e.target.value)}
      />
      <SelectOptions
        style="px-3 py-1.5 rounded-full"
        label="category"
        options={Child}
        name="category"
        clearValue="No category"
        onChange={handleChange}
      />
    </div>
  );
}