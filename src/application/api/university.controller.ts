import { University } from "@core/dtos/university.dto";
import { UniversityQueueDto } from "@core/dtos/university-queue.dto";
import { Body, Controller, Logger, Post } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { UniversityService } from "src/core/services/university.service";

@Controller("/universities")
export class UniversityController {
  private logger: Logger = new Logger(UniversityController.name);

  constructor(private readonly universityService: UniversityService) {}

  @Post("/queue")
  putQueue(@Body() body: UniversityQueueDto) {
    this.logger.log("[putQueue] - Received request", body);
    return this.universityService.handlerCountriesList(body.countries);
  }

  @MessagePattern("get_country_info")
  getCountryInfo(@Payload() payload: { country: string }) {
    this.logger.log("[getCountryInfo] - Received message", payload);
    return this.universityService.getCountryUniversityInfo(payload.country);
  }

  @EventPattern("save_university")
  saveUniversity(@Payload() payload: University) {
    this.logger.log("[saveUniversity] - Received message", payload);
    return this.universityService.saveUniversity(payload);
  }
}
