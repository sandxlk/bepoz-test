import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';

@Module({
  providers: [OfferService],
  exports: [OfferService],
})
export class OfferModule {}
