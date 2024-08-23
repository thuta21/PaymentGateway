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

    this.paymentContext.setPaymentStrategy(paymentStrategy);
    const result = await this.paymentContext.initPayment(body.amount);

    return result;
  }
}
