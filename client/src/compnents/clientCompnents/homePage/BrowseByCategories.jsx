import CategoryCard from "../../globalComponents/CategoryCard"
import SectionLabel from "../../globalComponents/SectionLabel"
import SectionTitle from "../../globalComponents/SectionTitle"


export default function BrowseByCategories({ categories }) {
    return (
        <>
            {
                categories?.length > 0 &&

                <div className="px-4 separate-sections mt-5">
                    <SectionLabel label={"ক্যাটাগরিজ"} />
                    <SectionTitle title={"ক্যাটাগরি অনুযায়ী পণ্য"} />
                    <div className="grid gap-5 mt-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {categories.length > 0 && categories?.map(cat =>
                            <CategoryCard
                                key={cat?._id}
                                href={`/shop?category=${cat?._id}`}
                                category={cat} />
                        )}
                    </div>
                </div>
            }
        </>
    )
};