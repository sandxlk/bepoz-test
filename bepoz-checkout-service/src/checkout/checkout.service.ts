import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/dto/customer.dto';
import { CustomerRule, Offer } from '../offer/dto/offer.dto';
import { OfferService } from '../offer/offer.service';
import { Product } from '../product/dto/product.dto';
import { ProductService } from '../product/product.service';
import { Rule } from '../rule/dto/rule.dto';
import { RuleLogic } from '../rule/enums/logic.enum';
import { RuleService } from '../rule/rule.service';
import { CheckoutArgs, ProductArg } from './dto/checkout.args';
import { Checkout, ProductInfo } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
  private readonly _logger = new Logger(CheckoutService.name);

  constructor(
    private _customerService: CustomerService,
    private _offerService: OfferService,
    private _productService: ProductService,
    private _ruleService: RuleService,
  ) {}

  async getCheckoutInfoArgs(checkoutArgs: CheckoutArgs): Promise<Checkout> {
    this._logger.log(
      `getCheckoutInfoBuArgs method execute with data-${JSON.stringify(
        checkoutArgs,
      )}`,
    );
    this._logger.log('getCheckoutInfoBuArgs: start getting customer..');
    const customer: Customer = await this._customerService
      .getCustomerById(checkoutArgs.customerId)
      .catch((error) => {
        this._logger.error(
          `getCheckoutInfoArgs: error getting customer data-${error}`,
        );
        throw new HttpException(
          'Unbale to fetch Customer data',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    this._logger.log('getCheckoutInfoBuArgs: start getting customer offer..');
    const customerOffer: Offer = await this._offerService
      .getAllOffersByCustomer(checkoutArgs.customerId)
      .catch((error) => {
        this._logger.error(
          `getCheckoutInfoArgs: error getting customer offers data-${error}`,
        );
        throw new HttpException(
          'Unbale to fetch Customer Offers data',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    this._logger.log(
      'getCheckoutInfoBuArgs: start getting product info list..',
    );
    const productsInfo: ProductInfo[] = await this._mapProductInfoList(
      customerOffer,
      checkoutArgs.productList,
    ).catch((error) => {
      this._logger.debug(
        `getCheckoutInfoArgs: error getting product info list data-${error}`,
      );
      throw error;
    });

    const totalAmount: number = productsInfo
      .map((product) => product.amount)
      .reduce((sum, currAmount) => sum + currAmount, 0);
    const mappedCheckout: Checkout = {
      chid: 1,
      customer,
      productsInfo,
      totalAmount,
    };

    return mappedCheckout;
  }

  private async _mapProductInfoList(
    customerOffer: Offer,
    productArgs: ProductArg[],
  ): Promise<ProductInfo[]> {
    this._logger.log(
      `_mapProductInfoList method executing with data-${JSON.stringify(
        customerOffer,
      )}--${JSON.stringify(productArgs)}`,
    );
    const productInfoList: ProductInfo[] = [];
    for (const productArg of productArgs) {
      const product: Product = await this._productService
        .getProductById(productArg.productId)
        .catch((error) => {
          this._logger.error(
            `_mapProductInfoList: error getting product data-${error}`,
          );
          throw new HttpException(
            'Unbale to fetch Product data',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      const productOfferRules: CustomerRule[] = customerOffer.rules.filter(
        (rule) => rule.productId == productArg.productId,
      );

      const productInfo: ProductInfo = {
        product,
        selectedQty: productArg.qty,
        revisedQty: productArg.qty,
        amount: parseFloat((productArg.qty * product.retailPrice).toFixed(2)),
        rules: [],
      };

      if (productOfferRules.length > 0) {
        const ruleIds: number[] = productOfferRules.map(
          (cusRule) => cusRule.ruleId,
        );
        await this._mapRuleOffer(productInfo, ruleIds).catch((error) => {
          this._logger.debug(
            `_mapProductInfoList: error map rule offer data-${error}`,
          );
          throw error;
        });
      }
      productInfoList.push(productInfo);
    }
    return productInfoList;
  }

  private async _mapRuleOffer(
    productInfo: ProductInfo,
    rulesIds: number[],
  ): Promise<void> {
    this._logger.log(
      `_mapRuleOffer method executing with data-${JSON.stringify(
        productInfo,
      )}--${JSON.stringify(rulesIds)}`,
    );
    const rules: Rule[] = [];
    for (const ruleId of rulesIds) {
      const rule: Rule = await this._ruleService
        .getRuleById(ruleId)
        .catch((error) => {
          this._logger.error(`_mapRuleOffer: error getting rule data-${error}`);
          throw new HttpException(
            'Unbale to fetch Rule data',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
      rules.push(rule);
      if (
        rule.logic === RuleLogic.EXTRA_PRODUCT &&
        productInfo.selectedQty >= rule.dealCount
      ) {
        productInfo.revisedQty =
          productInfo.revisedQty +
          Math.trunc(productInfo.selectedQty / rule.dealCount) *
            rule.extraCount;
      }
      if (rule.logic === RuleLogic.DISCOUNT) {
        productInfo.amount = parseFloat(
          (
            productInfo.amount -
            productInfo.amount * (rule.discount / 100)
          ).toFixed(2),
        );
      }
    }
    productInfo.rules = rules;
  }
}
