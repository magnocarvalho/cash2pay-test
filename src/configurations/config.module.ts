import { Module } from '@nestjs/common';
import { ConfigurationEnv } from './config-env';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [ConfigurationEnv],
  exports: [ConfigurationEnv],
})
export class ConfigurationModule {}
