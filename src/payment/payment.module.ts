import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentContext } from 'src/payment/payment.context';
import { PaymentFactory } from 'src/payment/payment.factory';

@Module({
  imports: [ConfigModule],
  exports: [PaymentFactory, PaymentContext],
  providers: [PaymentModule, PaymentFactory, PaymentContext],
})
export class PaymentModule {}
