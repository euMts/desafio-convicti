import type { Error, ErrorCount, FirstErrorResponse } from "@/types/Error";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const isDev = import.meta.env.VITE_ENV === "dev";

export const getFirstErrorsData = async (token: string): Promise<FirstErrorResponse> => {
  if (!token) {
    throw new Error("Invalid token");
  }

  try {
    if (isDev) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {
        total: 266,
      };
    }

    const response = await axios.get(`${BASE_API_URL}/errors`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status !== 200) {
      throw new Error(`Erro ao buscar erros: ${response.statusText}`);
    }

    const { data } = response.data;

    return {
      total: data.total,
    };
  } catch (error) {
    console.error("Erro ao buscar os primeiros erros:", error);
    throw error;
  }
};

export const getErrorssCountByPlatform = async (token: string): Promise<ErrorCount> => {
  if (!token) {
    throw new Error("Invalid token");
  }

  let totalAndroid = 0;
  let totalIos = 0;
  let currentPage = 1;
  let totalPages = 1;

  try {
    if (isDev) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return { totalAndroid: 1, totalIos: 3 };
    }
    while (currentPage <= totalPages) {
      const response = await axios.get(`${BASE_API_URL}/errors`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage },
      });

      if (response.status !== 200) {
        throw new Error(`Erro ao buscar downloads: ${response.statusText}`);
      }

      const { data } = response.data;
      totalPages = data.last_page;

      data.data.forEach((item: Error) => {
        if (item.platform === "ANDROID") totalAndroid++;
        if (item.platform === "IOS") totalIos++;
      });

      currentPage++;
    }

    return { totalAndroid, totalIos };
  } catch (error) {
    console.error("Erro ao buscar contagem de erros:", error);
    throw error;
  }
};
