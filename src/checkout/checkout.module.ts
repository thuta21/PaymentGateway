import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { PaymentContext } from 'src/payment/payment.context';
import { PaymentFactory } from 'src/payment/payment.factory';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PaymentContext, ConfigModule],
  controllers: [CheckoutController],
  providers: [CheckoutService, PaymentFactory, PaymentContext],
})
export class CheckoutModule {}
