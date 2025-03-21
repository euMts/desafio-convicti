import type { Download, DownloadCount, FirstDownloadResponse } from "@/types/Download";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const isDev = import.meta.env.VITE_ENV === "dev";

export const getFirstDownloadsData = async (
  token: string,
  signal?: AbortSignal
): Promise<FirstDownloadResponse | undefined> => {
  if (!token) {
    throw new Error("Invalid token");
  }

  try {
    if (isDev) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {
        total: 324,
      };
    }

    const response = await axios.get(`${BASE_API_URL}/downloads`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });

    if (response.status !== 200) {
      throw new Error(`Erro ao buscar downloads: ${response.statusText}`);
    }

    const { data } = response.data;

    return {
      total: data.total,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Requisição de primeiros downloads cancelada.");
    } else {
      console.error("Erro ao buscar os primeiros downloads:", error);
      throw error;
    }
  }
};

export const getDownloadsCountByPlatform = async (
  token: string,
  signal?: AbortSignal
): Promise<DownloadCount | undefined> => {
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

      return { totalAndroid: 204, totalIos: 120 };
    }

    while (currentPage <= totalPages) {
      const response = await axios.get(`${BASE_API_URL}/downloads`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage },
        signal,
      });

      if (response.status !== 200) {
        throw new Error(`Erro ao buscar downloads: ${response.statusText}`);
      }

      const { data } = response.data;
      totalPages = data.last_page;

      data.data.forEach((item: Download) => {
        if (item.platform === "ANDROID") totalAndroid++;
        if (item.platform === "IOS") totalIos++;
      });

      currentPage++;
    }

    return { totalAndroid, totalIos };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Requisição de contagem de downloads cancelada.");
    } else {
      console.error("Erro ao buscar contagem de downloads:", error);
      throw error;
    }
  }
};
