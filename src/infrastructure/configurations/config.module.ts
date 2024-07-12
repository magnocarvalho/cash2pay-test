import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";

import { ConfigurationEnv } from "./config-environments";

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRoot({
      level: "debug",
    }),
  ],
  controllers: [],
  providers: [ConfigurationEnv],
  exports: [ConfigurationEnv],
})
export class ConfigurationModule {}
