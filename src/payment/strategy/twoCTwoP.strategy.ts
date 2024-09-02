import { ConfigService } from '@nestjs/config';
import { parseUserDefinedFields } from 'common/helpers/helpers';
import { PaymentStrategy } from 'src/payment/strategy/payment.strategy';
import * as jwt from 'jsonwebtoken';
import { HttpCustomService } from 'src/providers/http/http-custom.service';
export class TwoCTwoPStrategy implements PaymentStrategy {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpCustomService: HttpCustomService,
  ) {}

  async init(data: any): Promise<any> {
    const config = this.configService.get('twoCTwoP');
    const merchantConfig = config.merchants;
    const baseUrl = config.baseUrl;
    const currencyCode = data.currency || merchantConfig.default;
    const merchantId = merchantConfig[currencyCode]?.merchantId;
    const secretKey = merchantConfig[currencyCode]?.secretKey;

    const invoiceNo = data.invoiceId;
    const amount = data.amount;
    const paymentDescription = data.paymentDescription || 'Payment for order';

    const frontendReturnUrl = data.frontendReturnUrl;
    const backendReturnUrl = 'http://localhost:3000/api/checkout/callback'; // it should be our backend url
    const userDefined = parseUserDefinedFields(data.userDefined);
    // const nonceStr = data.merchantRefId;

    const payload = {
      // MANDATORY PARAMS
      merchantID: merchantId,
      invoiceNo: invoiceNo,
      description: paymentDescription,
      amount: amount,
      currencyCode: currencyCode,
      frontendReturnUrl: frontendReturnUrl,
      backendReturnUrl: backendReturnUrl,

      userDefined1: userDefined[0],
      userDefined2: userDefined[1],
      userDefined3: userDefined[2],
      // userDefined4: userDefined[3],
      // userDefined5: userDefined[4],
    };

    // Validate data before proceeding
    this.validateData(backendReturnUrl, secretKey, merchantId, currencyCode);

    // Sign the JWT
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

    try {
      const response = await this.httpCustomService.getResponse(baseUrl, token);

      if (response.data && response.data.payload) {
        const jwtToken = response.data.payload;

        const decodedPayload = jwt.verify(jwtToken, secretKey, {
          algorithms: ['HS256'],
        }) as any;

        if (
          decodedPayload.respDesc === 'Success' &&
          decodedPayload.respCode === '0000'
        ) {
          return decodedPayload.webPaymentUrl;
        } else {
          throw new Error(decodedPayload.respDesc || 'Error.');
        }
      }
      throw new Error(
        'Something went wrong in requesting the payment screen for 2C2P',
      );
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  private validateData(
    backendResultUrl: string,
    secretKey: string,
    merchantId: string,
    currencyCode: string,
  ): void {
    if (!secretKey || !merchantId) {
      throw new Error('Invalid 2C2P Secret Key OR Invalid 2C2P Merchant Id');
    }

    if (!currencyCode) {
      throw new Error('Invalid Currency');
    }

    try {
      new URL(backendResultUrl);
    } catch (error) {
      console.log(error);

      throw new Error(
        'Invalid backend URL, Be careful, this might lead to wrong data ',
      );
    }
  }
}
