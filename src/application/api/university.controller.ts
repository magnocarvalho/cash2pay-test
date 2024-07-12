import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UniversityService } from 'src/core/services/university.service';

@Controller('/universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Get()
  getHello() {
    return this.universityService.getAllUniversities();
  }

  @MessagePattern('process_list')
  startProcessList(@Payload() payload: string[]) {
    this.universityService.createWithList(payload);
  }

  @Post('/put-queue')
  putQueue(@Body() body: { country: string[] }) {
    this.universityService.putInQueue(body.country);
  }
}
