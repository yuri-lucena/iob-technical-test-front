import api from "../../axios.config";
import { User } from "@/interfaces";
import { Response } from "@/classes/response";

const userService = {
  async createUser(user: User): Promise<Response<User>> {
    try {
      const { data } = await api.post<Response<User>>("/user", user);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async createUserWithBankAccount(user: User): Promise<Response<boolean>> {
    try {
      const { data } = await api.post<Response<boolean>>(
        "/user/create-user-with-bank-account",
        user
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default userService;
