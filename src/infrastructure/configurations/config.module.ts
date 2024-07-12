import { Module } from "@nestjs/common";
import { ConfigurationEnv } from "./config-enviroments";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";

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
