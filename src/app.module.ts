import { Module } from "@nestjs/common";

import { TypeOrmConnectorModule } from "@infrastructure/database/postgres.module";
import { UniversityModule } from "@infrastructure/modules/university.module";

@Module({
  imports: [TypeOrmConnectorModule, UniversityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
