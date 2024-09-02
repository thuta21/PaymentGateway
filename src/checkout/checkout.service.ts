import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckoutService {
  async storeCheckoutData(data: any) {
    console.log('storeCheckoutData', data);
  }
}
