import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutArgs } from './dto/checkout.args';
import { Checkout } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  private readonly _logger = new Logger(CheckoutController.name);

  constructor(private _checkoutService: CheckoutService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async getCheckoutdata(@Body() checkoutArgs: CheckoutArgs): Promise<Checkout> {
    this._logger.log('getCheckoutdata executing..');
    return this._checkoutService.getCheckoutInfoArgs(checkoutArgs);
  }
}
