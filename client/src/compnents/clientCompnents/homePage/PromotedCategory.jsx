import { Link } from "react-router-dom"

export default function PromotedCategory({ category }) {
    return (
        <>
            {
                category?.name &&

                <div className="home-page-bannar mt-5 relative">
                    <img src={category?.image?.url} alt={category?.name}
                        className="w-full h-full object-cover brightness-50" />

                    <p className="absolute left-4 top-16 text-white text-xl line-clamp-2">{category?.description}</p>
                    <div className="flex font-primary items-center absolute top-5 left-4">
                        <div className="h-10 w-3 border-2 border-orange-400  p-0.5">
                            <div className="w-full h-full bg-orange-400"> </div>
                        </div>
                        <h1 className="text-orange-400 ml-3 text-sm">{category?.name}</h1>
                    </div>

                    <Link to={`/shop?category=${category?._id}`} className="absolute px-3 py-1.5 rounded bottom-5 left-4 block z-20 bg-orange-400 w">
                        আরো দেখুন
                    </Link>
                </div>
            }
        </>
    )
};
