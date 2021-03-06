import { Controller, Get } from '@nestjs/common';

import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly service: BusinessService) { }

  @Get('trigger-aging')
  async triggerAging() {
    return {
      success: true,
      entitiesAffected: await this.service.performAging(),
    };
  }
}
