import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UniversityApiService {
  private logger = new Logger(UniversityApiService.name);

  constructor(private readonly httpAxios: HttpService) {}

  async getUniversityInfo(country: string) {
    const { data, status } = await lastValueFrom(
      this.httpAxios.get("http://universities.hipolabs.com/search", {
        params: country,
      }),
    );

    if (status > 400) {
      this.logger.error("GET_UNIVERSITY_INFO_ERROR", { data, status });
      throw new RpcException("GET_UNIVERSITY_INFO_ERROR");
    }

    this.logger.log("GET_UNIVERSITY_INFO_SUCCESS", { data, status });

    return data;
  }
}
