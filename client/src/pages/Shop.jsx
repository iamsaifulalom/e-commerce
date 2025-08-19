import { useInfiniteProducts } from "../hooks/useInifiniteProducts"
import Loader from "../compnents/globalComponents/Loader"
import SelectOptions from "../compnents/globalComponents/SelectOptions"
import ProductsGrid from "../compnents/clientCompnents/ShopPage/ProductsGrid"
import ProductCard from "../compnents/globalComponents/ProductCard"
import { VirtuosoGrid } from "react-virtuoso"
import { useState } from "react"
import ClearCategoryFilter from "../compnents/clientCompnents/homePage/ClearCategoryFilter"
import ChatSupport from "../compnents/globalComponents/ChatSupport"

const options = [
  { _id: "lowPrice", name: "দাম কম থেকে বেশি" },
  { _id: "heighPrice", name: "দাম বেশি থেকে কম" },
  { _id: "newProducts", name: "নতুন পণ্য" },
  { _id: "oldProducts", name: "আগের পণ্য" },
]

export default function Shop() {

  const [filter, setFilter] = useState("")

  const {
    isFetching,
    error,
    products,
    loadMore,
    hasMore
  } = useInfiniteProducts(filter);

  if (error) throw new Error(error || "Something went wrong!!");

  return (
    <div className="p-4">
      <ClearCategoryFilter />
      <div className="flex justify-between items-center">
        <h1 className="text-xl select-none font-bold">শপ পেজ</h1>
        <SelectOptions
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-full px-3 py-1.5 text-sm"
          clearValue="ফিল্টার ছাড়া"
          options={options}
        />
      </div>

      <VirtuosoGrid
        useWindowScroll
        totalCount={products.length}
        components={{
          List: ProductsGrid,
          Item: ({ children, ...props }) => (
            <div {...props}>{children}</div>
          ),
        }}
        endReached={() => {
          if (!isFetching && hasMore) loadMore();
        }}
        itemContent={(index) => {
          const item = products[index];
          return item ? <ProductCard product={item} /> : <span>Loading...</span>;
        }}
      />
      {isFetching && <Loader />}
      <ChatSupport/>
    </div>
  );
}
