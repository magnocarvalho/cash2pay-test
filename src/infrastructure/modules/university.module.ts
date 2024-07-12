import { UniversityController } from "@application/api/university.controller";
import { UniversityService } from "@core/services/university.service";
import { ConfigurationModule } from "@infrastructure/configurations/config.module";
import { UniversityEntity } from "@infrastructure/database/entities/university.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [ConfigurationModule, TypeOrmModule.forFeature([UniversityEntity])],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
