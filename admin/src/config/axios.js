import axios from "axios";

const bazarBhaiApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
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