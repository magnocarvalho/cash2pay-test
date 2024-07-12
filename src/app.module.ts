import { TypeOrmConnectorModule } from "@infrastructure/database/postgres.module";
import { UniversityModule } from "@infrastructure/modules/university.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmConnectorModule, UniversityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
