import api from "../../axios.config";
import { Response } from "@/classes/response";
import { BankAccount } from "@/interfaces";
import { toast } from "react-toastify";

const bankAccountService = {
  async createBankAccount(
    createBankAccount: BankAccount
  ): Promise<Response<BankAccount>> {
    try {
      const response = await api.post("/bank-account", createBankAccount);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getAllUserAccounts(): Promise<BankAccount[] | null | undefined> {
    try {
      const response = await api.get<Response<BankAccount[]>>(
        "/bank-account/get-all"
      );
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response.data.error_message);
    }
  },
};

export default bankAccountService;
