import axios from 'axios';

const bbMediaApi = axios.create({
    baseURL: import.meta.env.VITE_BBH_MEDIA_SERVICE_API_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

bbMediaApi.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
})

export default bbMediaApi