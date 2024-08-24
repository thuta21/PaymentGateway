import { ConfigType, registerAs } from '@nestjs/config';

export const twoCTwoPToken = 'twoCTwoP';

export const TwoCTwoPConfig = registerAs(twoCTwoPToken, () => ({
  baseUrl:
    process.env.TWOCTWOP_BASE_URL || 'https://sandbox-pgw.2c2p.com/payment/4.3',
  merchants: {
    default: 'MMK',
    MMK: {
      secretKey: process.env.TWOCTWOP_MMK_SECRET_KEY,
      merchantId: process.env.TWOCTWOP_MMK_MERCHANT_ID,
      currencyCode: 'MMK',
    },
    USD: {
      secretKey: process.env.TWOCTWOP_USD_SECRET_KEY,
      merchantId: process.env.TWOCTWOP_USD_MERCHANT_ID,
      currencyCode: 'USD',
    },
  },
}));

export type TwoCTwoPConfigType = ConfigType<typeof TwoCTwoPConfig>;
