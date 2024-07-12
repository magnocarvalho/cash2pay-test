import { UniversityController } from "@application/api/university.controller";
import { UniversityService } from "@core/services/university.service";
import { ConfigurationModule } from "@infrastructure/configurations/config.module";
import { UniversityEntity } from "@infrastructure/database/entities/university.entity";
import { UniversityRmqProvider } from "@infrastructure/rabbitmq/university-rmq";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forFeature([UniversityEntity]),
    HttpModule,
    ClientsModule.registerAsync([UniversityRmqProvider]),
  ],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
