import { Customer } from "../../login/dto/customer.dto";
import { ProductInfo } from "./product-info.dto";

export interface Checkout{
        chid: number;
        customer: Customer;
        productsInfo: ProductInfo[];
        totalAmount: number;
}