import bazarBhaiApi from "../config/axios";

export async function getRelatedProducts(params) {
    const res = await bazarBhaiApi.get("/products", {
        params
    })
    return res.data.products
}