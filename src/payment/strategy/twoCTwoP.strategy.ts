import { ConfigService } from '@nestjs/config';
import { parseUserDefinedFields } from 'common/helpers/helpers';
import { PaymentStrategy } from 'src/payment/strategy/payment.strategy';
import * as jwt from 'jsonwebtoken';
export class TwoCTwoPStrategy implements PaymentStrategy {
  constructor(private readonly configService: ConfigService) {}

  init(data: any): string {
    console.log('2C2P payment strategy');

    const config = this.configService.get('twoCTwoP');
    const merchantConfig = config.merchants;
    const currencyCode = data.currency || merchantConfig.default;
    const baseUrl = config.baseUrl;
    const merchantId = merchantConfig[currencyCode]?.merchantId;
    const secretKey = merchantConfig[currencyCode]?.secretKey;
    const paymentDescription = data.paymentDescription || 'Payment for order';
    const frontendReturnUrl = data.frontendUrl;
    const backendReturnUrl = data.backendUrl;
    const userDefined = parseUserDefinedFields(data.userDefined);
    const nonceStr = data.merchantRefId;

    // Optional Parameters
    const paymentChannel = '';
    const promotion = '';
    const tokenize = '';
    const cardTokens = '';
    const tokenizeOnly = '';
    const interestType = '';
    const installmentPeriodFilter = '';
    const productCode = '';
    const recurring = '';
    const invoicePrefix = '';
    const recurringAmount = '';
    const allowAccumulate = '';
    const maxAccumulateAmount = '';
    const recurringInterval = '';
    const recurringCount = '';
    const chargeNextDate = '';
    const chargeOnDate = '';
    const paymentExpiry = '';
    const paymentRouteID = '';
    const statementDescriptor = '';
    const subMerchants = '';
    const locale = '';

    const payload = {
      // MANDATORY PARAMS
      merchantID: merchantId,
      invoiceNo: data.invoiceId,
      description: paymentDescription,
      amount: data.amount,
      currencyCode,

      // OPTIONAL PARAMS
      paymentChannel,
      promotion,
      tokenize,
      cardTokens,
      tokenizeOnly,
      interestType,
      installmentPeriodFilter,
      productCode,
      recurring,
      invoicePrefix,
      recurringAmount,
      allowAccumulate,
      maxAccumulateAmount,
      recurringInterval,
      recurringCount,
      chargeNextDate,
      chargeOnDate,
      paymentExpiry,
      userDefined1: userDefined[0],
      userDefined2: userDefined[1],
      userDefined3: userDefined[2],
      userDefined4: userDefined[3],
      userDefined5: userDefined[4],
      paymentRouteID,
      statementDescriptor,
      subMerchants,
      locale,
      frontendReturnUrl,
      backendReturnUrl,
      nonceStr,
    };

    // Validate data before proceeding
    this.validateData(backendReturnUrl, secretKey, merchantId, currencyCode);

    // Sign the JWT
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });
    console.log(token);

    return token;
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
        'Invalid backend URL, Be careful, this might lead to wrong data',
      );
    }
  }
}
