import type { Evaluation, EvaluationCount, FirstEvaluationResponse } from "@/types/Evaluation";
import { formatDate } from "@/utils/dateUtils";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const isDev = import.meta.env.VITE_ENV === "dev";

export const getFirstEvaluationsData = async (token: string): Promise<FirstEvaluationResponse> => {
  if (!token) {
    throw new Error("Invalid token");
  }

  try {
    if (isDev) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const response = await fetch("/mock/evaluationsData.json");

        if (!response.ok) {
          throw new Error(`Erro ao carregar JSON evaluationsData: ${response.status} ${response.statusText}`);
        }

        const sample: Evaluation[] = await response.json();

        return {
          evaluations: sample.map(formatEvaluation).slice(0, 4),
        };
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        return { evaluations: [] };
      }
    }

    const response = await axios.get(`${BASE_API_URL}/evaluations`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: 1 },
    });

    if (response.status !== 200) {
      throw new Error(`Erro ao buscar avaliações: ${response.statusText}`);
    }

    const { data } = response.data;

    return {
      evaluations: data.data.map(formatEvaluation).slice(0, 4),
    };
  } catch (error) {
    console.error("Erro ao buscar as primeiras avaliações:", error);
    throw error;
  }
};

export const getEvaluationsCountByPlatform = async (token: string): Promise<EvaluationCount> => {
  if (!token) {
    throw new Error("Invalid token");
  }

  let totalAndroid = 0;
  let totalIos = 0;
  let totalEvaluations = 0;
  let sumEvaluations = 0;
  let currentPage = 1;
  let totalPages = 1;

  try {
    if (isDev) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return { totalAndroid: 100, totalIos: 122, average: "4.2" };
    }
    while (currentPage <= totalPages) {
      const response = await axios.get(`${BASE_API_URL}/evaluations`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage },
      });

      if (response.status !== 200) {
        throw new Error(`Erro ao buscar avaliações: ${response.statusText}`);
      }

      const { data } = response.data;
      totalPages = data.last_page;

      data.data.forEach((item: Evaluation) => {
        if (item.platform === "ANDROID") totalAndroid++;
        if (item.platform === "IOS") totalIos++;

        sumEvaluations += item.evaluation;
        totalEvaluations++;
      });

      currentPage++;
    }

    const average = totalEvaluations > 0 ? (sumEvaluations / totalEvaluations).toFixed(1) : "0.0";

    return { totalAndroid, totalIos, average };
  } catch (error) {
    console.error("Erro ao buscar contagem de avaliações:", error);
    throw error;
  }
};

const formatEvaluation = (item: Evaluation): Evaluation => ({
  id: item.id,
  device_id: item.device_id,
  description: item.description || "-",
  evaluation:
    typeof item.evaluation === "number" ? item.evaluation : parseInt(item.evaluation, 10) || 0,
  improvements: item.improvements || "-",
  created_at: formatDate(item.created_at as string),
  updated_at: item.updated_at,
  platform:
    item.platform === "ANDROID" ? "Android" : item.platform === "IOS" ? "iOS" : item.platform,
});
