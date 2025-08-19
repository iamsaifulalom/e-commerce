export default function HomePageLoader() {

    const emptyCategoriesForShowingLoadingState = new Array(6).fill(null)


    return (
        <div>
            <div className="w-full animate-pulse aspect-video  max-h-[400px] bg-gray-300"></div>
            {/* ================ categories loader =============== */}
            <div className="px-4 mt-5">
                <div className="bg-gray-300 w-28 h-4 rounded animate-pulse"></div>
                <div className="bg-gray-300 mt-3 w-40 h-6 rounded animate-pulse"></div>
                <div className="grid gap-5 mt-3  grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {emptyCategoriesForShowingLoadingState?.map((_, i) => (
                        <div key={i} className="bg-gray-300 w-full rounded animate-pulse aspect-video"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}
