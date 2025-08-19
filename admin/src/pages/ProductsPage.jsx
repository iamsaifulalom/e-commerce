import { useEffect, useState } from "react";
import Loader from "../componnents/ui/Loader"
import useGetProducts from "../hooks/useGetProducts";
import ProductsList from "../componnents/products/ProductsList";
import SearchBarAndFilter from "../componnents/products/SearchBarAndFilter";
import Paginatore from "../componnents/ui/Paginatore";
import Toast from "../componnents/ui/Toast";

const options = [
  { _id: "stockOut", name: "Stock out" },
  { _id: "bestSelling", name: "Best selling" },

]

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  // query products
  const [q, setQ] = useState("");
  // filter 
  const [filter, setFilter] = useState("")

  const {
    error,
    data,
    isLoading
  } = useGetProducts({ q, page, filter })


  return (
    <div className="max-w-xl mx-auto">
      <Toast danger={true} message={error} />
      <h1 className="text-xl font-bold">Products</h1>
      <SearchBarAndFilter
        placeholder="Find products"
        options={options}
        onChange={(e) => setFilter(e.target.value)}
        clearValue="No filter"
        setSearchTerm={setQ}
      />
      <ProductsList products={data?.products} />
      {isLoading && <Loader />}
      {!isLoading &&
        <Paginatore
          page={page}
          setPage={setPage}
          hasMore={data?.hasMore}
        />}
    </div>
  );
}