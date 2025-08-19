import useGetRelatedProducts from "../../../hooks/useGetRelatedProducts";
import Loader from "../../globalComponents/Loader";
import ProductList from "../../globalComponents/ProductsList";

export default function RelatedProducts({ category, excludeProduct }) {

    const { isLoading, error, data } = useGetRelatedProducts({
        category,
        excludeProduct
    })

    if (isLoading) return <Loader />
    if (data.length < 0 || error) return

    return (
        <ProductList
            style=""
            label="প্রোডাক্ট"
            title="সম্পর্কিত প্রোডাক্ট"
            products={data}
        />
    );
}