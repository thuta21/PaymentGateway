import { Module } from '@nestjs/common';
import { PaymentContext } from 'src/payment/payment.context';
import { PaymentFactory } from 'src/payment/payment.factory';

@Module({
  exports: [PaymentFactory, PaymentContext],
  providers: [PaymentModule, PaymentFactory, PaymentContext],
})
export class PaymentModule {}
