import axios from "axios";

const bazarBhaiApi = axios.create({
    baseURL: import.meta.env.VITE_BAZAR_BHAI_API_URL,
    headers: {
        "Content-Type": "application/json"
    }

})

bazarBhaiApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default bazarBhaiApi