import { PaymentStrategy } from 'src/payment/strategy/payment.strategy';
import { TwoCTwoPStrategy } from 'src/payment/strategy/twoCTwoP.strategy';
import { WaveStrategy } from 'src/payment/strategy/wave.strategy';

export class PaymentFactory {
  private paymentStrategy: Record<string, PaymentStrategy> = {
    '2c2p': new TwoCTwoPStrategy(),
    wave: new WaveStrategy(),
  };

  createStrategy(paymentMethod: string): PaymentStrategy {
    if (!this.isSupported(paymentMethod)) {
      throw new Error('Payment method is not supported');
    }

    return this.paymentStrategy[paymentMethod];
  }

  isSupported(paymentMethod: string): boolean {
    return paymentMethod in this.paymentStrategy;
  }
}
