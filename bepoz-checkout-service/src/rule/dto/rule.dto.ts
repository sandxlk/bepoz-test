import { RuleLogic } from '../enums/logic.enum';

export interface Rule {
  rid: number;
  logic: RuleLogic;
  discount?: number;
  dealCount?: number;
  extraCount?: number;
}
