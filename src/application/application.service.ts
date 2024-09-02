import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService {
  async getApplication(): Promise<string> {
    return 'Hello World!';
  }

  async createApplication(): Promise<string> {
    return 'Application created!';
  }
}
