import { useState } from "react"
import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"


export default function ClearCategoryFilter() {
    const [searchParams] = useSearchParams()
    const [isFilterdWithCategory, setIsFilterdWithCategory] = useState(false)

    useEffect(() => {
        const value = searchParams.get("category")
        setIsFilterdWithCategory(value ? true : false)
    }, [searchParams])


    return (
        <div className="w-full flex  items-center">
            {isFilterdWithCategory &&
                <Link to="/shop">
                    <span className="tag-badge inline-block cursor-pointer bg-orange-100">
                        ক্যাটাগরি ফিল্টার ছাড়া
                    </span>
                </Link>
            }

        </div>
    )
}
