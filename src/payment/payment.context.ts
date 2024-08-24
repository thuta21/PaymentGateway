import { PaymentStrategy } from 'src/payment/strategy/payment.strategy';

export class PaymentContext {
  paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  initPayment(data: any) {
    this.paymentStrategy.init(data);
  }
}
