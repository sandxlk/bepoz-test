import { Injectable, Logger } from '@nestjs/common';
import { customerList } from './data/customer.data';
import { Customer } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  private readonly _logger = new Logger(CustomerService.name);

  async getAllCustomer(): Promise<Customer[]> {
    return customerList;
  }

  async getCustomerById(customerId: number): Promise<Customer> {
    this._logger.log(
      `getCustomerById method executing with data-${customerId}`,
    );
    return customerList.filter((customer) => customer.cid === customerId)[0];
  }

  async getCustomerByUserId(userId: string): Promise<Customer> {
    this._logger.log(
      `getCustomerByUserId method executing with data-${userId}`,
    );
    return customerList.filter((customer) => customer.userId === userId)[0];
  }
}
