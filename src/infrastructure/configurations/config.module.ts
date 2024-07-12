import { Module } from "@nestjs/common";
import { ConfigurationEnv } from "./config-enviroments";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { WinstonModule } from "nest-winston";

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 15000,
      maxRedirects: 5,
    }),
    WinstonModule.forRoot({
      level: "debug",
    }),
  ],
  controllers: [],
  providers: [ConfigurationEnv],
  exports: [ConfigurationEnv],
})
export class ConfigurationModule {}
