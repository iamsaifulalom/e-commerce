import CategoryCard from "../compnents/globalComponents/CategoryCard"
import Loader from "../compnents/globalComponents/Loader"
import SectionLabel from "../compnents/globalComponents/SectionLabel"
import SectionTitle from "../compnents/globalComponents/SectionTitle"
import { useParentCategories } from "../hooks/useCategories"

export default function CategoriesPage() {

    const { isLoading, error, data } = useParentCategories()


    if (isLoading) return <Loader />
    if (error) throw new Error(error || "Something went wrong.")
    return (
        <>
            {data.length > 0 &&
                <div className="p-4">
                    <SectionLabel label="সকল ক্যাটাগরি" />
                    <SectionTitle title="আরো নির্দিষ্ট করে পণ্য খুজুন" />
                    <div className="category-grid">
                        {
                            data.map(data => (
                                <CategoryCard href={`/categories/${data?._id}`}
                                    key={data?._id}
                                    category={data} />
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
};
