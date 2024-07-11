import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UniversityEntity } from 'src/universities/university.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(UniversityEntity)
    private readonly uniRepository: Repository<UniversityEntity>,
    private readonly httpAxios: HttpService,
  ) {}

  getAllUniversities() {
    return this.uniRepository.find();
  }

  createWithList(payload: string[]) {
    const result = [];
    for (const key in payload) {
      result.push(this.getInfoCountry(key));
    }

    return Promise.all(result);
  }

  getInfoCountry(country: string) {
    // http://universities.hipolabs.com/search?country=brazil
    return this.httpAxios
      .get('http://universities.hipolabs.com/search', {
        params: country,
      })
      .toPromise();
  }
}
