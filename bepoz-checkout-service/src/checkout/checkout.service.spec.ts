import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/dto/customer.dto';
import { Offer } from '../offer/dto/offer.dto';
import { OfferService } from '../offer/offer.service';
import { Product } from '../product/dto/product.dto';
import { ProductService } from '../product/product.service';
import { Rule } from '../rule/dto/rule.dto';
import { RuleLogic } from '../rule/enums/logic.enum';
import { RuleService } from '../rule/rule.service';
import { CheckoutService } from './checkout.service';
import { CheckoutArgs } from './dto/checkout.args';
import { Checkout } from './dto/checkout.dto';

describe('CheckoutService', () => {
  let service: CheckoutService;

  const mockCustomers: Customer[] = [
    { cid: 1, name: 'User 1', userId: 'user1' },
    { cid: 2, name: 'User 2', userId: 'user2' },
  ];
  const mockCustomerService = {
    getCustomerById: jest.fn(() => {
      return Promise.resolve(mockCustomers[0]);
    }),
  };

  const mockProducts: Product[] = [
    {
      pid: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      retailPrice: 10,
    },
    {
      pid: 2,
      name: 'Product 2',
      description: 'Product 2 description',
      retailPrice: 20,
    },
  ];
  const mockProductService = {
    getProductById: jest.fn(() => {
      return Promise.resolve(mockProducts[0]);
    }),
  };

  const mockRules: Rule[] = [
    {
      rid: 1,
      logic: RuleLogic.DISCOUNT,
      discount: 5,
    },
    {
      rid: 2,
      logic: RuleLogic.EXTRA_PRODUCT,
      dealCount: 2,
      extraCount: 1,
    },
  ];
  const mockRuleService = {
    getRuleById: jest.fn(() => {
      return Promise.resolve(mockRules[0]);
    }),
  };

  const mockOffers: Offer[] = [
    { oid: 1, customerId: 1, rules: [{ productId: 1, ruleId: 2 }] },
    { oid: 2, customerId: 2, rules: [{ productId: 2, ruleId: 1 }] },
  ];
  const mockOfferService = {
    getAllOffersByCustomer: jest.fn(() => {
      return Promise.resolve(mockOffers[0]);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        CustomerService,
        OfferService,
        ProductService,
        RuleService,
      ],
    })
      .overrideProvider(CustomerService)
      .useValue(mockCustomerService)
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .overrideProvider(RuleService)
      .useValue(mockRuleService)
      .overrideProvider(OfferService)
      .useValue(mockOfferService)
      .compile();

    service = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getCheckoutInfoArgs should return a response', async () => {
    const checkoutArgs: CheckoutArgs = {
      customerId: 1,
      productList: [{ productId: 1, qty: 10 }],
    };
    const mockCheckoutResponse: Checkout = {
      chid: 1,
      customer: mockCustomers[0],
      productsInfo: [
        {
          product: mockProducts[0],
          selectedQty: 10,
          revisedQty: 10,
          rules: [mockRules[0]],
          amount: 95,
        },
      ],
      totalAmount: 95,
    };
    const checkoutResponse: Checkout = await service.getCheckoutInfoArgs(
      checkoutArgs,
    );
    expect(checkoutResponse).toEqual(mockCheckoutResponse);
  });
});
