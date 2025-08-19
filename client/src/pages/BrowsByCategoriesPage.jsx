import { useParams } from "react-router-dom"
import SectionLabel from "../compnents/globalComponents/SectionLabel"
import SectionTitle from "../compnents/globalComponents/SectionTitle"
import { useChildCategories } from "../hooks/useCategories"
import Loader from "../compnents/globalComponents/Loader"
import CategoryCard from "../compnents/globalComponents/CategoryCard"

export default function BrowsByCategoriesPage() {
  const { id } = useParams()
  const { isLoading, error, data } = useChildCategories(id)

  if (isLoading) return <Loader />
  if (error) throw new Error(error || "Something went wrong")
  return (
    <div className="p-4">
      <SectionTitle title={`সাব ক্যাটাগরি`} />
      <div className="category-grid">
        {data?.map(cat => (
          <CategoryCard href={`/shop?category=${cat?._id}`} key={cat?._id} category={cat} />
        ))}
      </div>
      {data?.length === 0 && <p className="text-sm text-center mt-5">এই ক্যাটাগরির সাব ক্যাটাগরি নেই</p>}
    </div>
  )
}
