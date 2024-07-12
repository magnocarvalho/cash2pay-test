import { University } from "@core/dtos/university.dto";
import { IUniversity } from "@core/interfaces/university.interface";
import { UniversityEntity } from "@infrastructure/database/entities/university.entity";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { catchError, lastValueFrom } from "rxjs";
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
    return lastValueFrom(
      this.clientWebhook.send("get_country_info", { country }).pipe(
        catchError((exception) => {
          this.logger.error("[ERROR]PUT_QUEUE_GET_COUNTRY_UNIVERSITY_INFO", {
            error: exception,
            country,
          });

          throw new RpcException(exception);
        }),
      ),
    );
  }

  async saveUniversity(payload: IUniversity) {
    const findUni = await this.uniRepository.findOne({
      where: {
        name: payload.name,
        country: payload.country,
        alpha_two_code: payload.alpha_two_code,
        "state-province": payload["state-province"],
      },
    });

    if (findUni) {
      this.logger.verbose("UNIVERSITY_ALREADY_EXISTS", findUni);
      return findUni;
    }

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
