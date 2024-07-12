import { University } from "@core/dtos/university.dto";
import { IUniversity } from "@core/interfaces/university.interface";
import { UniversityEntity } from "@infrastructure/database/entities/university.entity";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UniversityApiService } from "./university-api.service";

@Injectable()
export class UniversityService {
  logger: Logger = new Logger(UniversityService.name);
  constructor(
    @InjectRepository(UniversityEntity)
    private readonly uniRepository: Repository<UniversityEntity>,
    @Inject("UNIVERSITY")
    private readonly clientWebhook: ClientProxy,
    private readonly universityApiService: UniversityApiService,
  ) {}

  handlerCountriesList(countries: string[]) {
    countries.forEach((country) => {
      this.putQueueGetCountryUniversityInfo(country);
    });
    return { message: "Countries list received" };
  }

  putQueueGetCountryUniversityInfo(country: string) {
    this.logger.verbose("PUT_QUEUE_GET_COUNTRY_UNIVERSITY_INFO", { country });
    return this.clientWebhook.send("get_country_info", { country });
  }

  async saveUniversity(payload: IUniversity) {
    const uni = this.uniRepository.create(payload);
    await uni.save();
    this.logger.verbose("SAVE_UNIVERSITY_SUCCESS", uni);
    return uni;
  }

  putQueueToSave(payload: IUniversity) {
    return this.clientWebhook.emit("save_university", payload);
  }

  async getCountryUniversityInfo(country: string) {
    const result: University[] =
      await this.universityApiService.getUniversityInfo(country);
    this.logger.verbose("GET_COUNTRY_UNIVERSITY_INFO", { country, result });
    result.forEach((uni) => {
      this.putQueueToSave(uni);
    });

    return result;
  }
}
