import { ConfigService } from '@nestjs/config';

export class ConfigurationEnv {
  constructor(private configService: ConfigService) {}

  rabbitmq = {
    user: this.configService.get<string>('RABBITMQ_USER'),
    password: this.configService.get<string>('RABBITMQ_PASSWORD'),
    vhost: this.configService.get<string>('RABBITMQ_VHOST'),
    queue: this.configService.get<string>('RABBITMQ_QUEUE'),
  };

  postgres = {
    host: this.configService.get<string>('POSTGRES_HOST'),
    port: this.configService.get<number>('POSTGRES_PORT'),
    username: this.configService.get<string>('POSTGRES_USER'),
    password: this.configService.get<string>('POSTGRES_PASSWORD'),
    database: this.configService.get<string>('POSTGRES_DATABASE'),
  };
}
