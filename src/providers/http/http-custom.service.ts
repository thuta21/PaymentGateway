import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpCustomService {
  constructor(private readonly httpService: HttpService) {}

  async getResponse(baseUrl: string, token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(baseUrl + '/PaymentToken', {
          payload: token,
        }),
      );

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
