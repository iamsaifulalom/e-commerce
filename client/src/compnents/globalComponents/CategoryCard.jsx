import { Link } from "react-router-dom";

export default function CategoryCard({ href, category }) {
    return (
        <Link to={href}>
            <div>
                <div className="home-page-bannar">
                   <img src={category?.image?.url} className="object-cover w-full h-full" alt={category?.name} />
                </div>
                <h1 className="font-bangla text-center text-primary font-bold text-sm">{category?.name}</h1>
                <p className="text-xs font-bangla line-clamp-4">{category?.description}</p>
            </div>
        </Link>
    )
};
