import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null as DecodedToken | null,
  }),

  actions: {
    async login(email: string, password: string): Promise<boolean> {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const client_id = import.meta.env.VITE_CLIENT_ID;
        const client_secret = import.meta.env.VITE_CLIENT_SECRET;
        const { data } = await axios.post(`${BASE_URL}/oauth/token`, {
          grant_type: "password",
          username: email,
          password,
          client_id,
          client_secret,
        });

        this.token = data.access_token;
        localStorage.setItem("token", data.access_token);
        this.decodeToken();
        return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return false;
      }
    },

    decodeToken() {
      if (this.token) {
        this.user = jwtDecode<DecodedToken>(this.token);
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
