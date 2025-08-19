import bazarBhaiApi from "../config/axios";

export async function fetchProducts(params) {

    const response = await bazarBhaiApi.get("/products", {
        params: params
    })
    return response.data
}

export async function fetchProductDetails(id) {
    const res = await bazarBhaiApi.get(`/products/${id}`)
    return res.data
}