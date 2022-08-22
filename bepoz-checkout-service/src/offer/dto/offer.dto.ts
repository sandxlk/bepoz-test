export interface Offer {
  oid: number;
  customerId: number;
  rules: CustomerRule[];
}

export interface CustomerRule {
  productId: number;
  ruleId: number;
}
