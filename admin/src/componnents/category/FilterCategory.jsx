import SelectOptions from "../ui/SelectOptions"
import InputField from "../ui/InputField"

export default function FilterCategory({ setParentId, setCategoryType }) {
    return (
        <div className="flex justify-end  mt-5">

            <div className="w-[300px] rounded p-4 border border-gray-300">

                <InputField
                    onChange={(e) => setParentId(e.target.value)}
                    label="Get child categories by parent id"
                    placeholder="681397a5ae6bb5c0860b153b"
                />
                <SelectOptions
                    onChange={(e) => setCategoryType(e.target.value)}
                    style="px-2 py-1.5 rounded-full"
                    clearValue="No filter"
                    options={[
                        { _id: "Parent", name: "Parent" },
                        { _id: "Child", name: "Child" },
                    ]}
                />
            </div>
        </div>
    );
}