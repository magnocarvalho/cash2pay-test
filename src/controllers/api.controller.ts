import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UniversityService } from 'src/service/university.service';

@Controller()
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Get()
  getHello() {
    return this.universityService.getAllUniversities();
  }

  /**
   * 
   * @param payload [
   "argentina",
   "brasil",
   "chile",
   "colombia",
   "paraguai",
   "peru",
   "suriname",
   "uruguay"
]

   */
  @MessagePattern('process_list')
  startProcessList(@Payload() payload: string[]) {
    this.universityService.createWithList(payload);
  }

  @Post('/put-queue')
  putQueue(@Body() body: { country: string[] }) {
    this.universityService.putInQueue(body.country);
  }
}
