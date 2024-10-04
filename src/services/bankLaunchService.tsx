import { BankLaunch } from "@/interfaces";
import api from "../../axios.config";
import { Response } from "@/classes/response";
import { toast } from "react-toastify";

const bankLaunchService = {
  async createCreditLaunch(bankLaunch: BankLaunch): Promise<Response<boolean>> {
    try {
      const { data } = await api.post<Response<boolean>>(
        "/bank-launch/credit",
        bankLaunch
      );
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error_message);
      return new Response(false);
    }
  },

  async createDebitLaunch(bankLaunch: BankLaunch): Promise<Response<boolean>> {
    try {
      const { data } = await api.post<Response<boolean>>(
        "/bank-launch/debit",
        bankLaunch
      );
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error_message);
      return new Response(false);
    }
  },

  async createTransferLaunch(
    bankLaunch: BankLaunch
  ): Promise<Response<boolean>> {
    try {
      const { data } = await api.post<Response<boolean>>(
        "/bank-launch/transfer",
        bankLaunch
      );
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error_message);
      return new Response(false);
    }
  },

  async getAllLaunchHistory(
    bankLaunchId: number
  ): Promise<Response<BankLaunch[]>> {
    try {
      const { data } = await api.get<Response<BankLaunch[]>>(
        `/bank-launch/get-all-history/${bankLaunchId}`
      );
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error_message);
      return new Response(false);
    }
  },
};

export default bankLaunchService;
