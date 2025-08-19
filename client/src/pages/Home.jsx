import Banner from "../compnents/clientCompnents/homePage/Banner";
import BrowseByCategories from "../compnents/clientCompnents/homePage/BrowseByCategories";
import { useLandingPage } from "../hooks/useLandingPage";
import ProductList from "../compnents/globalComponents/ProductsList";
import Commitment from "../compnents/clientCompnents/homePage/Commitment";
import HomePageLoader from "../compnents/clientCompnents/homePage/HomePageLoader";
import PromotedCategory from "../compnents/clientCompnents/homePage/PromotedCategory";

export default function Home() {

    const { error, isLoading, data } = useLandingPage()

    if (isLoading) return <HomePageLoader />
    if (error) throw new Error(error.response.data.error || "সমস্যা হয়েছে")

    return (
        <div>
            <Banner />
            <BrowseByCategories
                categories={data?.categories}
            />

            {/* best selling products */}

            <ProductList
                label="প্রোডাক্ট"
                title="এখন জনপ্রিয়"
                products={data?.bestSaling}
            />

            {/* promoted category */}
            <PromotedCategory
                category={data?.promotedCategory} />

            {/* new arrivals */}
            <ProductList
                label="প্রোডাক্ট"
                title="নতুন আসছে"
                products={data?.newArrivals}
            />

            <Commitment />
        </div>
    )
};
