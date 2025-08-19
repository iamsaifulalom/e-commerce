import { useParams } from "react-router-dom";
import { useProductDetaisl } from "../hooks/useProducts";
import Loader from "../compnents/globalComponents/Loader";
import ImageGallary from "../compnents/clientCompnents/productDetailsPage/ImageGallary";
import SizeSelector from "../compnents/clientCompnents/productDetailsPage/SizeSelector";
import { useEffect, useState } from "react";
import ColourSelector from "../compnents/clientCompnents/productDetailsPage/ColourSelector";
import PriceAndStock from "../compnents/clientCompnents/productDetailsPage/PriceAndStock";
import Button from "../compnents/globalComponents/Button";
import Counter from "../compnents/clientCompnents/productDetailsPage/Counter";
import useCartStore from "../store/useCartStore";
import RelatedProducts from "../compnents/clientCompnents/productDetailsPage/RelatedProducts";

export default function ProductDetails() {
    const { id } = useParams();
    const { isLoading, error, data } = useProductDetaisl(id);

    const addToCart = useCartStore((state) => state.addToCart);

    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedColour, setSelectedColour] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [colours, setColours] = useState([])

    // Set default variant and color
    useEffect(() => {

        if (data?.variants?.length > 0) {
            const firstVariant = data.variants[0];
            setSelectedVariant(firstVariant);

            const colourList = firstVariant.colour
                ? firstVariant.colour.split(",").map((c) => c.trim())
                : [];
            setColours(colourList)
            if (colourList.length > 0) {
                setSelectedColour(colourList[0]);
            }
        }
    }, [data]);


    useEffect(() => {
        const colourList = selectedVariant?.colour
            ? selectedVariant.colour.split(",").map((c) => c.trim())
            : [];
        setColours(colourList)
        if (colourList?.length > 0) {
            setSelectedColour(colourList[0]);
        }
    }, [selectedVariant])


    const handleAddToCart = () => {

        if (!selectedVariant) return;
        addToCart({
            _id: id,
            title: data.title,
            image: data.images?.[0]?.url || "",
            size: selectedVariant?.size,
            colour: selectedColour,
            weight: selectedVariant?.weight,
            quantity,
            price: selectedVariant?.salePrice ?
                selectedVariant?.salePrice :
                selectedVariant?.regularPrice
        });
    };

    if (isLoading) return <Loader />;
    if (error) {
        if (error?.status === 404) {
            return <p className="text-xl text-center mt-5 text-red-500">এখন, এই পণ্যটি আমাদের কাছে নেই।</p>
        } else {
            throw new Error(error.message)
        }

    }

    return (
        <div className="container text-slate-700 mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageGallary images={data.images} />
                {/* ============ product info =========== */}
                <div>
                    <h1 className="text-2xl font-semibold mb-2">{data?.title}</h1>
                    <p className="text-slate-700 text-sm">{data?.description}</p>
                    <SizeSelector
                        sizes={data?.variants}
                        selectedSize={selectedVariant}
                        setSize={setSelectedVariant}
                    />
                    <ColourSelector
                        colours={colours}
                        selectedColour={selectedColour}
                        setSelectedColour={setSelectedColour}
                    />
                    <PriceAndStock quantity={quantity} variant={selectedVariant} />
                    <div className="flex gap-5 mt-5">
                        {/* Quantity Counter */}
                        <Counter quantity={quantity} setQuantity={setQuantity} />

                        {/* Add to Cart Button */}
                        <Button
                            onClick={handleAddToCart}
                            text="কার্টে যুক্ত করুন"
                            variant="primary"
                            disabled={!selectedVariant}
                        />
                    </div>
                </div>
                {/* ============ product info =========== */}
            </div>
            {/* ============ related products ========== */}

            <RelatedProducts
                category={data?.category?._id}
                // access product id to exclude it
                excludeProduct={id}

            />

        </div>
    );
}


