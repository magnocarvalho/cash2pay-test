import { Body, Controller, Logger, Post } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UniversityService } from "src/core/services/university.service";

@Controller("/universities")
export class UniversityController {
  private logger: Logger = new Logger(UniversityController.name);

  constructor(private readonly universityService: UniversityService) {}

  @MessagePattern("process_list")
  startProcessList(@Payload() payload: string[]) {
    this.logger.log("[startProcessList] - Received message", payload);
    this.universityService.createWithList(payload);
  }

  @Post("/start-list")
  putQueue(@Body() body: { country: string[] }) {
    this.logger.log("[putQueue] - Received message", body);
    this.universityService.putInQueue(body.country);
  }
}
