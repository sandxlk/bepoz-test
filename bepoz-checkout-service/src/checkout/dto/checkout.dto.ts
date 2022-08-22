import { Product } from '../../product/dto/product.dto';
import { Customer } from '../../customer/dto/customer.dto';
import { Rule } from 'src/rule/dto/rule.dto';

export interface Checkout {
  chid: number;
  customer: Customer;
  productsInfo: ProductInfo[];
  totalAmount: number;
}

export interface ProductInfo {
  product: Product;
  selectedQty: number;
  revisedQty: number;
  amount: number;
  rules: Rule[];
}
