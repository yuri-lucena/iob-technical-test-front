import api from "../../axios.config";
import { Auth, AuthResponse } from "@/interfaces";
import Cookies from "js-cookie";
import router from "next/router";
import { toast } from "react-toastify";

const authService = {
  async login(auth: Auth): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>("/auth/sign-in", auth);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async signOut(): Promise<void> {
    Cookies.remove("token");
    router.push("/login");
    toast.success("Sessão encerrada");
  },

  async verifyToken(): Promise<boolean> {
    try {
      const token = Cookies.get("token");
      const { data } = await api.post<boolean>("/auth/verify-token", { token });

      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        Cookies.remove("token");
        router.push("/login");

        toast.info("Sua sessão expirou");
        return false;
      }
      throw error;
    }
  },
};

export default authService;
