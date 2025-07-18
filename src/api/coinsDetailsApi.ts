import axios from "axios";
import handleApiError from "./handleApiError";

const API_KEY: string = import.meta.env.VITE_RAPIDAPI_COIN_KEY;
const API_HOST = import.meta.env.VITE_API_HOST_FOR_COIN;



export const coinsDetails = async (id: string) => {
  console.log('coinsDetails id', id);
  const options = {
    method: 'GET',
    url: `https://${API_HOST}/coin/${id}`,
    timeout: 10000,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h'
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(options)

    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};
