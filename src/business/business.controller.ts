import { Controller, Get } from '@nestjs/common';

@Controller('business')
export class BusinessController {

  @Get('trigger-aging')
  async triggerAging() {

  }
}
