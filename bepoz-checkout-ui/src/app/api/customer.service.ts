import axios from "axios";
import { apiConfig } from "../core/config/api.config";

export const getCustomerByUserId = async (userId: string) => {
  const response = await axios.get(`${apiConfig.CUSTOMER_BASE_URL}/${userId}`);
  return response.data;
};
