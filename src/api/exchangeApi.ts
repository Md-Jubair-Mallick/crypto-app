import axios from "axios";
import handleApiError from "./handleApiError";
import type { FilterParams } from "@/types";

const API_HOST = import.meta.env.VITE_API_HOST_FOR_EXCHANGE;
const API_BASE_URL: string = `https://${API_HOST}/api/v3/exchanges`;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "x-rapidapi-host": API_HOST,
        "Content-Type": "application/json",
    },
});

export const exchanges = async (filters: FilterParams = {}) => {
    try {
        const response = await axiosInstance.get('/', {
            params: {
                safeSearch: 'Off',
                textFormat: 'Raw',
                ...filters, // override defaults with provided filters
            },
        });
        return response?.data;
    } catch (error) {
        handleApiError(error);
    }
};
