import { Injectable, Logger } from '@nestjs/common';
import { ruleList } from './data/rule.data';
import { Rule } from './dto/rule.dto';

@Injectable()
export class RuleService {
  private readonly _logger = new Logger(RuleService.name);

  async getAllRules(): Promise<Rule[]> {
    this._logger.log('getAllRules method executing');
    return ruleList;
  }

  async getRuleById(ruleId: number): Promise<Rule> {
    this._logger.log(`getRuleById method executing with data-${ruleId}`);
    return ruleList.filter((rule) => rule.rid === ruleId)[0];
  }
}
