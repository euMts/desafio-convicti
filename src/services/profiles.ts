import type { FormatedProfiles, NewProfileData, Profile, SimpleProfileData } from "@/types/Profile";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const isDev = import.meta.env.VITE_ENV === "dev";

export const getProfilesData = async (token: string): Promise<{ profiles: FormatedProfiles[] }> => {
  if (!token) {
    throw new Error("Invalid token");
  }

  try {
    if (isDev) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const response = await fetch("/mock/profilesData.json");
        if (!response.ok) {
          throw new Error(
            `Erro ao carregar JSON profilesData: ${response.status} ${response.statusText}`
          );
        }
        const sample: Profile[] = await response.json();
        return {
          profiles: formatProfilesData(sample),
        };
      } catch (error) {
        console.error("Erro ao buscar dados dos perfis:", error);
        return {
          profiles: [],
        };
      }
    }
    const response = await axios.get(`${BASE_API_URL}/profiles`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status !== 200) {
      throw new Error(`Erro ao buscar avaliações: ${response.statusText}`);
    }

    const { data } = response.data;

    return {
      profiles: formatProfilesData(data),
    };
  } catch (error) {
    console.error("Erro ao buscar as primeiras avaliações:", error);
    throw error;
  }
};

export const formatProfilesData = (profilesRaw: Profile[]): FormatedProfiles[] => {
  return profilesRaw.map((profile) => ({
    id: profile.id,
    name: profile.name,
    total_users: profile.total_users,
    permissions: profile.permissions.map((permission) => ({
      id: permission.id,
      name: permission.name,
    })),
  }));
};

export const addNewProfile = async (
  profileData: NewProfileData,
  token: string
): Promise<{ status: number }> => {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { status: 201 };
  }
  try {
    const response = await axios.post(
      `${BASE_API_URL}/profiles`,
      { ...profileData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { status: response.status };
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const simplifyProfile = (profiles: FormatedProfiles[]): SimpleProfileData[] => {
  return profiles.map((profile) => ({
    id: profile.id,
    name: profile.name,
  }));
};
