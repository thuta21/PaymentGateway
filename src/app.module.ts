import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CheckoutModule } from './checkout/checkout.module';
import { PaymentModule } from './payment/payment.module';
import { ProvidersModule } from './providers/providers.module';
import { ApplicationModule } from './application/application.module';
import config from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...Object.values(config)],
    }),
    PaymentModule,
    CheckoutModule,
    ProvidersModule,
    ApplicationModule,
  ],
})
export class AppModule {}
