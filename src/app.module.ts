import { TypeOrmConnectorModule } from "@infrastructure/database/postgres.module";
import { UniversityModule } from "@infrastructure/modules/university.module";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmConnectorModule, UniversityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
