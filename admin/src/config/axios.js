import axios from "axios";

const bazarBhaiApi = axios.create({
    baseURL: import.meta.env.VITE_BAZAR_BHAI_API_URL,
    headers: {
        "Content-Type": "application/json"
    }

})

bazarBhaiApi.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

export default bazarBhaiApi