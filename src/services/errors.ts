import type { Error, ErrorCount, FirstErrorResponse } from "@/types/Error";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const isDev = import.meta.env.VITE_ENV === "dev";

export const getFirstErrorsData = async (
  token: string,
  signal?: AbortSignal
): Promise<FirstErrorResponse | undefined> => {
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
      signal,
    });

    if (response.status !== 200) {
      throw new Error(`Erro ao buscar erros: ${response.statusText}`);
    }

    const { data } = response.data;

    return {
      total: data.total,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Requisição de primeiros erros cancelada.");
    } else {
      console.error("Erro ao buscar os primeiros erros:", error);
      throw error;
    }
  }
};

export const getErrorssCountByPlatform = async (
  token: string,
  signal?: AbortSignal
): Promise<ErrorCount | undefined> => {
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
        signal,
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
    if (axios.isCancel(error)) {
      console.log("Requisição de contagem de erros cancelada.");
    } else {
      console.error("Erro ao buscar contagem de erros:", error);
      throw error;
    }
  }
};
