import { Link } from "react-router-dom";

const linksData = [
    { path: "/", text: "Home" },
    { path: "/shop", text: "Shop" },
    { path: "/categories", text: "Categories" }
]



export default function NavBar({ setIsOpen }) {

    return (
        <div className="flex w-full gap-3 justify-around items-center px-4">

            {linksData?.map(item => (
                <Link
                    key={item?.text}
                    className="hover:underline underline-offset-4"
                    to={item?.path}>
                    {item?.text}
                </Link>
            ))}
            <p
            onClick={()=> setIsOpen(p => !p)}
                className="hover:underline underline-offset-4 cursor-pointer">
                More
            </p>
        </div>
    )
};
