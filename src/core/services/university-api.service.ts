import { University } from "@core/dtos/university.dto";
import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UniversityApiService {
  private logger = new Logger(UniversityApiService.name);

  constructor(private readonly httpAxios: HttpService) {}

  async getUniversityInfo(country: string) {
    try {
      const { data, status } = await lastValueFrom(
        this.httpAxios.get("/search", {
          baseURL: "http://universities.hipolabs.com",
          params: { country },
          responseType: "json",
          responseEncoding: "utf8",
        }),
      );

      if (status > 400) {
        this.logger.error("GET_UNIVERSITY_INFO_ERROR", { data, status });
        throw new RpcException("GET_UNIVERSITY_INFO_ERROR");
      }

      this.logger.log("GET_UNIVERSITY_INFO_SUCCESS", { data, status });

      const universities = this.mapUniversityData(data);

      return universities;
    } catch (error) {
      this.logger.error("GET_UNIVERSITY_INFO_ERROR", error);
      throw new RpcException("GET_UNIVERSITY_INFO_ERROR");
    }
  }

  private mapUniversityData(data: any): University[] {
    return data.map((uni) => {
      return {
        alpha_two_code: uni.alpha_two_code,
        country: uni.country,
        domains: uni.domains,
        name: uni.name,
        "state-province": uni["state-province"],
        web_pages: uni.web_pages,
      };
    });
  }
}
