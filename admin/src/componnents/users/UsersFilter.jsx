import InputField from "../ui/InputField"
import Paginatore from "../ui/Paginatore"
import SelectOptions from "../ui/SelectOptions"

export default function UsersFilter({ setSearch, page, hasMore, setPage, setRole }) {
    return (
        <div className="flex mt-5 justify-end">
            <div className="w-[300px]  border border-gray-300 p-4">
                <Paginatore
                    page={page}
                    hasMore={hasMore}
                    setPage={setPage}
                />
                <InputField
                    placeholder="find user"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <SelectOptions
                    style="px-3 py-1.5 rounded-full"
                    clearValue="No filter"
                    options={[
                        { _id: "customer", name: "customer" },
                        { _id: "seller", name: "Seller" },
                        { _id: "admin", name: "Admin" },
                    ]}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>
        </div>
    );
}