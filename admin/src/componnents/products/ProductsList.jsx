import ProductCard from "./ProductCard"

export default function ProductsList({ products }) {

    return (
        <>
            {products?.map(p => (
                <ProductCard key={p?._id} product={p} />
            ))}
            {products?.length === 0 && <p className="text-sm mt-5 text-center">No products found</p>}
        </>
    );
}