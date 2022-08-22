import axios from "axios";
import { apiConfig } from "../core/config/api.config";
import { CheckoutArgs } from "../pages/home/dto/checkout.args";

export const checkoutProducts = async (checkoutArgs: CheckoutArgs) => {
  const response = await axios.post(apiConfig.CHECKOUT_BASE_URL, checkoutArgs);
  return response.data;
};
