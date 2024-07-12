import { IUniversity } from "@core/interfaces/university.interface";
import { UniversityEntity } from "@infrastructure/database/entities/university.entity";
import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(UniversityEntity)
    private readonly uniRepository: Repository<UniversityEntity>,
    private readonly httpAxios: HttpService,
    @Inject("UNIVERSITY")
    private readonly clientWebhook: ClientProxy,
  ) {}

  getAllUniversities() {
    return this.uniRepository.find();
  }

  async createWithList(payload: string[]) {
    const preGet = [];
    for (const key in payload) {
      preGet.push(this.getInfoCountry(key));
    }

    const result: IUniversity[] = await Promise.all(preGet);

    for (const key of result) {
      const uni = this.uniRepository.create(key);
      await uni.save();
    }
  }

  getInfoCountry(country: string) {
    // http://universities.hipolabs.com/search?country=brazil
    return this.httpAxios
      .get("http://universities.hipolabs.com/search", {
        params: country,
      })
      .toPromise();
  }

  putInQueue(payload: string[]) {
    return this.clientWebhook.send("process_list", payload).toPromise();
  }
}
