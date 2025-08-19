import { useState } from "react";
import CategoryCard from "../componnents/category/CategoryCard";
import useGetCategories from "../hooks/useGetCategories";
import SearchBarAndFilter from "../componnents/products/SearchBarAndFilter";
import Toast from "../componnents/ui/Toast";
import Loader from "../componnents/ui/Loader";


const options = [
  { _id: "Parent", name: "Parent" },
  { _id: "Child", name: "Child" },
]

export default function CategoriesPage() {

  const [categoryType, setCategoryType] = useState("")
  const [parentId, setParentId] = useState("")
  const { isLoading, setError, error, categories } = useGetCategories({
    categoryType,
    parentId
  })

  return (
    <div className="max-w-xl mx-auto">
      <Toast danger={true} message={error} onClick={() => setError(null)} />
      <h1 className="text-xl font-bold">Categories</h1>
      <SearchBarAndFilter
        clearValue="No filter"
        options={options}
        onChange={(e) => setCategoryType(e.target.value)}
        placeholder="Get child categories"
        setSearchTerm={setParentId}
      />
      {categories?.map(cat => (
        <CategoryCard key={cat?._id} category={cat} />
      ))}
      {categories?.length === 0 && !isLoading && <p className="text-center mt-5">No category</p>}
      {isLoading && <Loader />}
    </div >
  );
}