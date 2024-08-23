import { PaymentStrategy } from 'src/payment/strategy/payment.strategy';

export class TwoCTwoPStrategy implements PaymentStrategy {
  constructor() {}

  async init(amount: number): Promise<void> {
    console.log(`TwoCheckout payment for amount: ${amount}`);
    return Promise.resolve();
  }
}
