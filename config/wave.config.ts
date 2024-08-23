import { ConfigType, registerAs } from '@nestjs/config';

export const waveToken = 'wave';

export const WaveConfig = registerAs(waveToken, () => ({
  baseUrl:
    process.env.WAVE_BASE_URL || 'https://testpayments.wavemoney.io:8107',
  time_to_live_in_seconds:
    process.env.WAVE_MONEY_TIME_TO_LIVE_IN_SECONDS || 300,
  merchant_name: process.env.WAVE_MONEY_MERCHANT_NAME || 'Testing',
  merchant_id: process.env.WAVE_MONEY_MERCHANT_ID,
  secret_key: process.env.WAVE_MONEY_SECRET_KEY,
}));

export type WaveConfigType = ConfigType<typeof WaveConfig>;
