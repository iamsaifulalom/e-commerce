import { useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import Loader from "../componnents/ui/Loader"
import UserTableRow from "../componnents/users/UserTableRow";
import UsersFilter from "../componnents/users/UsersFilter";
import SearchBarAndFilter from "../componnents/products/SearchBarAndFilter";
import Paginatore from "../componnents/ui/Paginatore";


const options = [
  { _id: "customer", name: "customer" },
  { _id: "seller", name: "Seller" },
  { _id: "admin", name: "Admin" },
]


export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const { isLoading, error, data } = useGetUsers({
    page,
    search,
    role
  })


  return (
    <div className="max-w-xl mx-auto  text-slate-800">
      <h1 className="text-xl font-bold">Users</h1>
      <SearchBarAndFilter
        placeholder="Find users"
        clearValue="No filter"
        setSearchTerm={setSearch}
        options={options}
        onChange={(e) => setRole(e.target.value)}
      />
      {!isLoading &&
        <table className="w-full mt-3">
          <thead>
            <tr className="border border-gray-300">
              <th className="border border-gray-300">Role</th>
              <th className="border border-gray-300">Phone number</th>
              <th className="border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.users?.map(user => (
                <UserTableRow
                  key={user?._id}
                  user={user}
                />
              ))
            }
          </tbody>
        </table>
      }
      {isLoading && <Loader />}
      <Paginatore
        page={page}
        setPage={setPage}
        hasMore={data?.hasMore} />
    </div>
  );
}