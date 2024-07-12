import { Module } from '@nestjs/common';
import { ConfigurationEnv } from './config-enviroments';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [ConfigurationEnv],
  exports: [ConfigurationEnv],
})
export class ConfigurationModule {}
