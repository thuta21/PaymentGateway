import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { PaymentContext } from 'src/payment/payment.context';
import { PaymentFactory } from 'src/payment/payment.factory';

@Module({
  imports: [PaymentFactory, PaymentContext],
  controllers: [CheckoutController],
  providers: [CheckoutService, PaymentFactory, PaymentContext],
})
export class CheckoutModule {}
