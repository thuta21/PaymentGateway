import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from 'src/checkout/checkout.service';
import { CheckoutDto } from 'src/checkout/dto/checkout.dto';
import { PaymentContext } from 'src/payment/payment.context';
import { PaymentFactory } from 'src/payment/payment.factory';

@Controller('checkout')
export class CheckoutController {
  private paymentContext: PaymentContext;

  constructor(
    private readonly checkoutService: CheckoutService,
    private paymentFactory: PaymentFactory,
  ) {
    this.paymentContext = new PaymentContext(null);
  }

  @Post('/make-checkout')
  async makeCheckout(@Body() body: CheckoutDto) {
    const paymentStrategy = this.paymentFactory.createStrategy(
      body.payment_method,
    );

    const invoiceId = 'TEST123';
    const amount = body.amount;
    const merchantRefId = 'MarchantRefId123';
    const backendUrl = 'http://localhost:3000/checkout/payment-callback';
    const currency = 'MMK';
    const frontendUrl = 'http://localhost:3000/checkout/payment-callback';
    const paymentDescription = 'Payment for test';
    const userDefined = ['test1', 'test2'];

    const data = {
      invoiceId,
      amount,
      merchantRefId,
      backendUrl,
      currency,
      frontendUrl,
      paymentDescription,
      userDefined,
    };

    this.paymentContext.setPaymentStrategy(paymentStrategy);
    const result = this.paymentContext.initPayment(data);

    return result;
  }
}
