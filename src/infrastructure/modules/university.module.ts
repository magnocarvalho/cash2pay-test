import { UniversityController } from "@application/api/university.controller";
import { UniversityService } from "@core/services/university.service";
import { UniversityEntity } from "@infrastructure/database/entities/university.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UniversityEntity])],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
