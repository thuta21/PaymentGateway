import { PaymentStrategy } from 'src/payment/strategy/payment.strategy';

export class WaveStrategy implements PaymentStrategy {
  constructor() {}

  async init(amount: number): Promise<void> {
    console.log(`Wave payment for amount: ${amount}`);
    return Promise.resolve();
  }
}
