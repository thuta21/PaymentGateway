import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentStrategy } from 'src/payment/strategy/payment.strategy';
import { TwoCTwoPStrategy } from 'src/payment/strategy/twoCTwoP.strategy';
import { HttpCustomService } from 'src/providers/http/http-custom.service';

@Injectable()
export class PaymentFactory {
  private paymentStrategy: Record<string, PaymentStrategy>;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpCustomService: HttpCustomService,
  ) {
    this.paymentStrategy = {
      '2c2p': new TwoCTwoPStrategy(this.configService, this.httpCustomService),
      // wave: new WaveStrategy(),
    };
  }

  createStrategy(paymentMethod: string): PaymentStrategy {
    if (!this.isSupported(paymentMethod)) {
      throw new Error('Payment method is not supported');
    }

    return this.paymentStrategy[paymentMethod];
  }

  isSupported(paymentMethod: string): boolean {
    return paymentMethod in this.paymentStrategy;
  }
}
