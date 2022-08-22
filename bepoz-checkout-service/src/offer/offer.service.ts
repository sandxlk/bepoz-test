import { Injectable } from '@nestjs/common';
import { offerList } from './data/offer.data';
import { Offer } from './dto/offer.dto';

@Injectable()
export class OfferService {
  async getAllOffersByCustomer(customerId: number): Promise<Offer> {
    return offerList.filter((offer) => offer.customerId === customerId)[0];
  }
}
