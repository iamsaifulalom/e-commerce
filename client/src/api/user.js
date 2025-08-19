import bazarBhaiApi from "../config/axios";

export async function getUser(url) {
    const endPoint = "/api/users/me"
    return await bazarBhaiApi.get(endPoint)
}
