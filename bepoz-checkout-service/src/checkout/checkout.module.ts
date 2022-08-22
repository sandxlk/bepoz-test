import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';
import { OfferModule } from 'src/offer/offer.module';
import { RuleModule } from 'src/rule/rule.module';

@Module({
  imports: [CustomerModule, ProductModule, OfferModule, RuleModule],
  providers: [CheckoutService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
