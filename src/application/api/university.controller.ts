import { University } from "@core/dtos/university.dto";
import { Body, Controller, Logger, Post } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UniversityService } from "src/core/services/university.service";

@Controller("/universities")
export class UniversityController {
  private logger: Logger = new Logger(UniversityController.name);

  constructor(private readonly universityService: UniversityService) {}

  @Post("/start-list")
  putQueue(@Body() body: { country: string[] }) {
    this.logger.log("[putQueue] - Received message", body);
    this.universityService.handlerCountriesList(body.country);
  }

  @MessagePattern("get_country_info")
  getCountryInfo(@Payload() payload: { country: string }) {
    this.logger.log("[getCountryInfo] - Received message", payload);
    return this.universityService.getCountryUniversityInfo(payload.country);
  }

  @MessagePattern("save_university")
  saveUniversity(@Payload() payload: University) {
    this.logger.log("[saveUniversity] - Received message", payload);
    return this.universityService.saveUniversity(payload);
  }
}
