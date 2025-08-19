import { useQuery } from "@tanstack/react-query";
import SelectOptions from "../ui/SelectOptions";
import bazarBhaiApi from "../../config/axios";
import Toast from "../ui/Toast";

export default function Seller({ sellerId, setProductInfo }) {

  const { isLoading, error, data } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await bazarBhaiApi.get("/users?role=seller");
      return res.data?.users

    },
    retry : false
  })

  return (
    <div className="p-3 border rounded mt-3 border-gray-300">
      <Toast danger={true} message={error?.message} />
      <h1 className="text-xl font-bold">Seller</h1>
      <p>Seller id: {sellerId}</p>
      {!isLoading &&
        <SelectOptions
          defaultValue={sellerId}
          onChange={(e) => setProductInfo(p => ({ ...p, "seller": e.target.value }))}
          options={data}
          style="rounded-full"
        />}
      {isLoading && <p>Seller data fething....</p>}
    </div>
  )
}
