import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConnectorModule } from './database/postgres.module';
import { ConfigurationModule } from './configurations/config.module';

@Module({
  imports: [ConfigurationModule, TypeOrmConnectorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
