import { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ShowProductVarinats from "./ShowProductVarinats";

export default function ProductVariants({ product, setProduct }) {

  const [variant, setVarint] = useState({
    size: "",
    colour: "",
    stock: 0,
    weight: 0,
    regularPrice: 0,
    salePrice: 0
  })

  function handleChange(e) {
    const { name, value } = e.target;

    if (["regularPrice , salePrice , stock , weight"].includes(name)) {
      console.log(value)
      return setVarint(p => ({ ...p, [name]: Number(value) }))
    }

    setVarint(prev => ({ ...prev, [name]: value }));
  }



  function addVariant() {

    const { size, regularPrice, weight } = variant;

    if (!size || !regularPrice || !weight) return;

    setProduct(prev => {
      const indexOfMatch = prev?.variants?.findIndex(v => v.size === variant?.size);

      if (indexOfMatch > -1) {
        const updatedVariants = [...prev.variants];
        updatedVariants[indexOfMatch] = variant;
        return { ...prev, variants: updatedVariants };
      }

      return { ...prev, variants: [...prev.variants, variant] };
    });

    setVarint({
      size: "",
      colour: "",
      stock: 0,
      weight: 0,
      regularPrice: 0,
      salePrice: 0
    })
  }

  return (
    <div>
      <ShowProductVarinats product={product} setProduct={setProduct} setVariant={setVarint} />

      <div className="p-3 border rounded mt-3 border-gray-300">
        <InputField
          style="mt-2"
          label="Size"
          name="size"
          value={variant?.size}
          placeholder="xl"
          onChange={handleChange}
        />
        <InputField
          style="mt-2"
          label="Colour"
          name="colour"
          value={variant?.colour}
          placeholder="কালো, নীল, হলুদ , ব্লু"
          onChange={handleChange}
        />


        <InputField
          style="mt-2"
          label="Stock"
          name="stock"
          type="number"
          value={variant?.stock}
          placeholder="500 কেজী"
          onChange={handleChange}
        />

        <InputField
          style="mt-2"
          label="Weight in gram"
          name="weight"
          type="number"
          value={variant?.weight}
          placeholder="500"
          onChange={handleChange}
        />
        <InputField
          style="mt-2"
          label="Regular price"
          name="regularPrice"
          placeholder="500"
          type="number"
          value={variant?.regularPrice}
          onChange={handleChange}
        />
        <InputField
          style="mt-2"
          label="Sale price"
          name="salePrice"
          placeholder="400"
          type="number"
          value={variant?.salePrice}
          onChange={handleChange}
        />
        <Button
          onClick={addVariant}
          variant="primary"
          text="Add"
          style="w-[100px] mt-3" />
      </div>
    </div>
  )

}