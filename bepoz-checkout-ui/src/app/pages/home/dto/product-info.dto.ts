import { Product } from "./product.dto";

export interface ProductInfo {
    product: Product;
    selectedQty: number;
    revisedQty: number;
    amount: number;
    rules: Rule[];
  }

  export interface Rule{
    rid: number;
    logic: string;
    discount?: number;
    dealCount?: number;
    extraCount?: number;
  }