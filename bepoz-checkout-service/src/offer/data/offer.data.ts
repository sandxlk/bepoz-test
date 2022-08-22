import { Offer } from '../dto/offer.dto';

export const offerList: Offer[] = [
  { oid: 1, customerId: 1, rules: [{ productId: 1, ruleId: 2 }] },
  { oid: 2, customerId: 2, rules: [{ productId: 3, ruleId: 1 }] },
  { oid: 3, customerId: 3, rules: [{ productId: 2, ruleId: 3 }] },
];
