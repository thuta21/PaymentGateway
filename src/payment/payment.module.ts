import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentContext } from 'src/payment/payment.context';
import { PaymentFactory } from 'src/payment/payment.factory';
import { HttpCustomService } from 'src/providers/http/http-custom.service';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  imports: [ConfigModule, ProvidersModule, HttpModule],
  exports: [PaymentFactory, PaymentContext],
  providers: [PaymentModule, PaymentFactory, PaymentContext, HttpCustomService],
})
export class PaymentModule {}
