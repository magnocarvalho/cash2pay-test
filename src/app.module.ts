import { Module } from "@nestjs/common";

import { ConfigurationModule } from "./infrastructure/configurations/config.module";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmConnectorModule } from "@infrastructure/database/postgres.module";
import { WinstonModule } from "nest-winston";
import { format } from "winston";
import { UniversityModule } from "@infrastructure/modules/university.module";

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmConnectorModule,
    HttpModule,
    WinstonModule.forRoot({
      format: format.json(),
    }),
    UniversityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
