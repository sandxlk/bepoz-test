import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { OfferModule } from './offer/offer.module';
import { RuleModule } from './rule/rule.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [
    CustomerModule,
    ProductModule,
    OfferModule,
    RuleModule,
    CheckoutModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
