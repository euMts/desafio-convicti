import type { FormatedUser, NewUserData, UserData } from "@/types/User";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const isDev = import.meta.env.VITE_ENV === "dev";

export const getUserData = async (token: string): Promise<{ status: number; data: UserData }> => {
  if (!token) {
    throw new Error("Invalid token");
  }

  try {
    // if (!isDev) {
    //   await new Promise((resolve) => setTimeout(resolve, 2000));

    //   const response = await fetch("/mock/userData.json");
    //   const userData: UserData = await response.json();
    //   return { status: 200, data: userData };
    // }

    const response = await axios.get(`${BASE_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { status: response.status, data: response.data.data.user };
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const getAllUsersData = async (token: string): Promise<{ data: FormatedUser[] }> => {
  if (!token) {
    throw new Error("Invalid token");
  }

  try {
    if (isDev) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("/mock/allUsersData.json");
      const allUsersData: UserData[] = await response.json();

      return { data: formatUsersData(allUsersData) };
    }

    const response = await axios.get(`${BASE_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: formatUsersData(response.data.data) };
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

const formatUserData = (rawUser: UserData): FormatedUser => {
  return {
    name: rawUser.name,
    email: rawUser.email,
    profileName: rawUser.profile.name,
    active: rawUser.active,
  };
};

const formatUsersData = (rawUsers: UserData[]): FormatedUser[] => rawUsers.map(formatUserData);

export const addNewUser = async (
  userData: NewUserData,
  token: string
): Promise<{ status: number }> => {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { status: 201 };
  }
  try {
    const response = await axios.post(
      `${BASE_API_URL}/users`,
      { ...userData },
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