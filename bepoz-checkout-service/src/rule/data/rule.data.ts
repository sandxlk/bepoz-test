import { Rule } from '../dto/rule.dto';
import { RuleLogic } from '../enums/logic.enum';

export const ruleList: Rule[] = [
  { rid: 1, logic: RuleLogic.DISCOUNT, discount: 9 },
  { rid: 2, logic: RuleLogic.EXTRA_PRODUCT, dealCount: 2, extraCount: 1 },
  { rid: 3, logic: RuleLogic.EXTRA_PRODUCT, dealCount: 4, extraCount: 1 },
];
