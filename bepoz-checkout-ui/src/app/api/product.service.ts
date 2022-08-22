import axios from "axios";
import { apiConfig } from "../core/config/api.config";

export const getAllProducts = async () => {
  const response = await axios.get(apiConfig.PRODUCT_BASE_URL);
  return response.data;
};
