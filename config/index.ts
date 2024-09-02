import {
  TwoCTwoPConfig,
  TwoCTwoPConfigType,
  twoCTwoPToken,
} from 'config/two-c-two-p.config';
import { AppConfig, AppConfigType, appRegToken } from './app.config';
import { WaveConfig, WaveConfigType, waveToken } from 'config/wave.config';
import {
  DatabaseConfig,
  DatabaseConfigType,
  dbRegToken,
} from 'config/database.config';

export * from './app.config';

export interface AllConfigType {
  [appRegToken]: AppConfigType;
  [twoCTwoPToken]: TwoCTwoPConfigType;
  [waveToken]: WaveConfigType;
  [dbRegToken]: DatabaseConfigType;
}

export default {
  AppConfig,
  TwoCTwoPConfig,
  WaveConfig,
  DatabaseConfig,
};
