import Paginatore from "../ui/Paginatore"
import InputField from "../ui/InputField"
import SelectOptions from "../ui/SelectOptions"




export default function ProductsFilter({
    setQuery,
    page,
    setPage,
    hasMore,
    setFilter

}) {
    return (
        <div className="flex justify-end">

            <div className="w-[320px] border border-gray-300 rounded mt-5 p-4">
                <Paginatore
                    page={page}
                    setPage={setPage}
                    hasMore={hasMore}
                />
                <InputField
                    placeholder="Find products"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <SelectOptions
                    style="px-3 py-1.5 rounded-full"
                    clearValue="No filter"
                    options={options}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
        </div>
    );
}