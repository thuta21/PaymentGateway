import { Controller, Get, Post } from '@nestjs/common';
import { ApplicationService } from 'src/application/application.service';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  async getApplication() {
    return this.applicationService.getApplication();
  }

  @Post()
  async createApplication(): Promise<string> {
    return this.applicationService.createApplication();
  }
}
