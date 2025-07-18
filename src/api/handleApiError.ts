// src/utils/handleApiError.ts

import { AxiosError, isAxiosError } from "axios";

interface ErrorDetails {
  status?: number;
  message: string;
}

const handleApiError = (error: unknown): ErrorDetails => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;

    return {
      status: axiosError.response?.status,
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "An unexpected API error occurred.",
    };
  }

  // Non-Axios errors
  return {
    message: error instanceof Error ? error.message : "An unknown error occurred.",
  };
};

export default handleApiError;
