import { PaymentStrategy } from 'src/payment/strategy/payment.strategy';

export class WaveStrategy implements PaymentStrategy {
  constructor() {}

  init(amount: number): string {
    console.log(`Wave payment for amount: ${amount}`);
    return 'true';
  }
}
