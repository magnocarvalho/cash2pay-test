import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationEnv {
  constructor(private configService: ConfigService) {}

  rabbitmq = {
    user: this.configService.get<string>('RABBITMQ_USER'),
    password: this.configService.get<string>('RABBITMQ_PASSWORD'),
    vhost: this.configService.get<string>('RABBITMQ_VHOST'),
    queue: this.configService.get<string>('RABBITMQ_QUEUE'),
    port: this.configService.get<number>('RABBITMQ_PORT'),
    protocol: this.configService.get<string>('RABBITMQ_PROTOCOL'),
    hostname: this.configService.get<string>('RABBITMQ_HOST'),
  };

  database = {
    host: this.configService.get<string>('POSTGRES_HOST'),
    port: this.configService.get<number>('POSTGRES_PORT'),
    username: this.configService.get<string>('POSTGRES_USER'),
    password: this.configService.get<string>('POSTGRES_PASSWORD'),
    database: this.configService.get<string>('POSTGRES_DATABASE'),
    synchronize:
      this.configService.get<boolean>('POSTGRES_SYNCHRONIZE')! || false,
    ssl:
      Boolean(this.configService.get<string>('POSTGRES_SSL') === 'true') ||
      false,
  };
}
