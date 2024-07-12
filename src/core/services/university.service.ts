import { IUniversity } from "@core/interfaces/university.interface";
import { UniversityEntity } from "@infrastructure/database/entities/university.entity";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UniversityApiService } from "./university-api.service";

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(UniversityEntity)
    private readonly uniRepository: Repository<UniversityEntity>,
    @Inject("UNIVERSITY")
    private readonly clientWebhook: ClientProxy,
    private readonly universityApiService: UniversityApiService,
  ) {}

  putInQueue(payload: string[]) {
    return this.clientWebhook.send("process_list", payload);
  }

  async saveUniversity(payload: IUniversity) {
    const uni = this.uniRepository.create(payload);
    await uni.save();
  }

  putQueueToSave(payload: IUniversity) {
    return this.clientWebhook.send("save_university", payload);
  }

  putQueueToGetUniversityInfo(payload: IUniversity[]) {}
}
