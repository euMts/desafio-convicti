import type { FirstNewFeatureResponse, NewFeature } from "@/types/NewFeature";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const isDev = import.meta.env.VITE_ENV === "dev";

export const getFirstNewFeaturesData = async (token: string): Promise<FirstNewFeatureResponse> => {
  if (!token) {
    throw new Error("Invalid token");
  }

  try {
    if (isDev) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const response = await fetch("/mock/newFeaturesData.json");

        if (!response.ok) {
          throw new Error(
            `Erro ao carregar JSON newFeaturesData: ${response.status} ${response.statusText}`
          );
        }
        const sample: NewFeature[] = await response.json();
        return {
          newFeatures: calculateUsagePercentage(sample),
        };
      } catch (error) {
        console.log("Erro ao buscar novas funcionalidades:", error);
        return { newFeatures: [] };
      }
    }

    const response = await axios.get(`${BASE_API_URL}/features`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { is_new: 1 },
    });

    if (response.status !== 200) {
      throw new Error(`Erro ao buscar novas funcionalidades: ${response.statusText}`);
    }

    const { data } = response.data;

    return {
      newFeatures: calculateUsagePercentage(data.data),
    };
  } catch (error) {
    console.error("Erro ao buscar as primeiras novas funcionalidades:", error);
    throw error;
  }
};

const calculateUsagePercentage = (data: NewFeature[]) => {
  const totalUsageSum = data.reduce((sum, item) => sum + item.total_usage, 0);

  return data.map((item) => ({
    ...item,
    usage_percentage:
      totalUsageSum > 0 ? ((item.total_usage / totalUsageSum) * 100).toFixed(1) + "%" : "0.0%",
  }));
};
