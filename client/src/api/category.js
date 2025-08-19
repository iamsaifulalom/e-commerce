import bazarBhaiApi from "../config/axios"

export async function getParentsCategories() {
    const { data } = await bazarBhaiApi.get("/categories")
    return data
}

// get child categories
export async function getChildCategories(id) {
    const { data } = await bazarBhaiApi.get(`/categories/child-categories?parent=${id}`)
    return data
}