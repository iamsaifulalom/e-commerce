import InputField from "../ui/InputField"
import DescriptionField from "../ui/DescriptionField"
import SelectOptions from "../ui/SelectOptions"
import Category from "./Category";

export default function ProductForm({ productInfo, setProductInfo }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setProductInfo(p => ({ ...p, [name]: value }))
  }

  return (
    <div className="border p-4 rounded border-gray-300 mt-5">
      <InputField
        name="title"
        label="Title"
        placeholder="সয়াবিন তেল"
        onChange={handleChange}
        value={productInfo?.title}
      />
      <DescriptionField
        name="description"
        label="Description"
        placeholder="সয়াবিন তেলের সংকিপ্ত বিবরণ"
        onChange={handleChange}
        value={productInfo?.description}
      />

      <SelectOptions
        label="Is it featured?"
        style="rounded-full px-3 py-1.5"
        onChange={handleChange}
        name="isFeatured"
        defaultValue={productInfo?.isFeatured}
        options={[
          { _id: "yes", name: "Yes" },
          { _id: "no", name: "No" },
        ]}
      />

      <Category
        setProduct={setProductInfo}
      />

      <DescriptionField
        name="keywords"
        label="Keywords"
        placeholder="তেল, সয়াবিন, সয়াবিন তেল"
        onChange={handleChange}
        value={productInfo?.keywords}
      />
    </div>
  );
}