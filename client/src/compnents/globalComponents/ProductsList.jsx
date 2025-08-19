import ProductCard from "./ProductCard";
import SectionLabel from "./SectionLabel";
import SectionTitle from "./SectionTitle";


export default function ProductList({ style = "px-4 ", label, title, products }) {

    return (
        <>
            {
                products?.length > 0 &&
                <div className={`mt-5 w-full ${style}`}>
                    <SectionLabel label={label} />
                    <SectionTitle title={title} />

                    <div className="w-full gap-2 mt-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        {products?.map(p => (
                            <ProductCard key={p?._id} product={p} />
                        ))}
                    </div>

                </div>
            }
        </>
    )
};
