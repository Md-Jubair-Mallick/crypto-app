import { coinsDetails } from "@/api/coinsDetailsApi";
import { exchanges } from "@/api/exchangeApi";
import { coins } from "@/api/cryptoApi";
import { news } from "@/api/newsApi";
import type { FilterParams } from "@/types";
import { useQuery } from "@tanstack/react-query";


export const useGetCoins = (filters: FilterParams = {}) => {
  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['coins', filters],
    queryFn: () => coins(filters),
    select: (response) => response?.data, // selecting the data field only
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60, // cache for 1 h
  });

  return { data, isLoading, error, isError };
};

export const useGetNews = (filters: FilterParams = {}) => {
  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['news', filters],
    queryFn: () => news(filters),
    select: (response) => response?.data, // selecting the data field only
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60, // cache for 1 h
  });

  return { data, isLoading, error, isError };
};

export const useGetExchange = (filters: FilterParams = {}) => {
  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['exchange', filters],
    queryFn: () => exchanges(filters),
    select: (response) => response, // selecting the data field only
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60, // cache for 1 h
  });

  return {
    exData: data,
    exIsLoading: isLoading,
    exIsError: isError,
    exError: error
  };
};

export const useGetCoinDetails = (id: string) => {
  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['coinDetails', id],
    queryFn: () => coinsDetails(id),
    select: (response) => response?.data, // selecting the data field only
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60, // cache for 1 h
  });
  
  return { data, isLoading, error, isError };
};