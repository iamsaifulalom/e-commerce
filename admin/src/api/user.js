import bazarBhaiApi from "../config/axios";

export async function getUser() {
    const res = await bazarBhaiApi.get("/api/users/me")
    return res.data
}