import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConnectorModule } from './database/postgres.module';
import { ConfigurationModule } from './configurations/config.module';
import { UniversityService } from './service/university.service';
import { UniversityController } from './controllers/api.controller';
import { UniversityEntity } from './universities/university.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { UniversityRmqProvider } from './service/university.module';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmConnectorModule,
    TypeOrmModule.forFeature([UniversityEntity]),
    HttpModule,
    // ClientsModule.registerAsync([UniversityRmqProvider]),
  ],
  controllers: [AppController, UniversityController],
  providers: [AppService, UniversityService],
})
export class AppModule {}
