import axios from "axios";
import handleApiError from "./handleApiError";
import type { FilterParams } from "@/types";

const API_KEY: string = import.meta.env.VITE_RAPIDAPI_COIN_KEY;
const API_HOST = import.meta.env.VITE_API_HOST_FOR_NEWS;
const API_BASE_URL: string = `https://${API_HOST}/v1/cryptodaily`;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
        "Content-Type": "application/json",
    },
});

export const news = async (filters: FilterParams = {}) => {
    try {
        const response = await axiosInstance.get('/', {
            params: {
                safeSearch: 'Off',
                textFormat: 'Raw',
                ...filters, // override defaults with provided filters
            },
        });
        console.log("API Response:", response.data);
        return response?.data;
    } catch (error) {
        handleApiError(error);
    }
};
