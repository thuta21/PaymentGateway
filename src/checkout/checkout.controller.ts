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
    // store api
    // await this.checkoutService.storeCheckoutData(body);

    const applicationId = body.application_id;
    const invoiceId = body.invoice_id;
    const amount = body.amount;
    const paymentMethod = body.payment_method;
    const paymentDescription = body.payment_description;
    const currencyCode = body.currency_code;
    const frontendReturnUrl = body.frontend_return_url;
    const backendReturnUrl = body.backend_return_url;
    const userDefined = [applicationId, paymentMethod, backendReturnUrl];

    const paymentStrategy = this.paymentFactory.createStrategy(paymentMethod);

    const data = {
      invoiceId,
      amount,
      paymentMethod,
      paymentDescription,
      currencyCode,
      frontendReturnUrl,
      userDefined,
    };

    this.paymentContext.setPaymentStrategy(paymentStrategy);
    const result = await this.paymentContext.initPayment(data);
    console.log('result: ' + result);

    return result;
  }

  @Post('/callback')
  async callback(@Body() body: any) {
    console.log('callback', body);
  }
}
