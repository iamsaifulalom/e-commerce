import { Link } from "react-router-dom";

export default function BrandLink({ onClick , className = "text-white "}) {
    return (
        <Link to="/"
            onClick={onClick}
            className="block  overflow-hidden">
            <h1 className={`text-lg md:text-xl ${ className}`}>BazarBhai<span className="text-sm font-bold text-orange-400">.com</span></h1>
        </Link>
    )
}
