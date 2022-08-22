import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './dto/customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;

  const mockCustomers: Customer[] = [
    { cid: 1, name: 'User 1', userId: 'user1' },
    { cid: 2, name: 'User 2', userId: 'user2' },
  ];
  const mockCustomerService = {
    getCustomerByUserId: jest.fn(() => {
      return Promise.resolve(mockCustomers[0]);
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    })
      .overrideProvider(CustomerService)
      .useValue(mockCustomerService)
      .compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getCustomerByUserId should return a response', async () => {
    const customer = await controller.getCustomerByUserId('user1');
    expect(customer).toEqual(mockCustomers[0]);
  });
});
