export interface CheckoutArgs {
    customerId: number;
    productList: ProductArg[];
  }
  
  export interface ProductArg {
    productId: number;
    qty: number;
  }
  