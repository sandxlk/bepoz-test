import { Controller, Get, Logger, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  private readonly _logger = new Logger(CustomerController.name);

  constructor(private _customerService: CustomerService) {}

  @Get('/:userId')
  async getCustomerByUserId(
    @Param('userId') userId: string,
  ): Promise<Customer> {
    return this._customerService.getCustomerByUserId(userId);
  }
}
