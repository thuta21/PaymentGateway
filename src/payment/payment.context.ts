import { PaymentStrategy } from 'src/payment/strategy/payment.strategy';

export class PaymentContext {
  paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  async initPayment(amount: number) {
    await this.paymentStrategy.init(amount);
  }
}
