import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigurationEnv } from './configurations/config-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configuration = app.get(ConfigurationEnv);

  await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        {
          port: configuration.rabbitmq.port,
          hostname: configuration.rabbitmq.hostname,
          password: configuration.rabbitmq.password,
          username: configuration.rabbitmq.user,
          protocol: configuration.rabbitmq.protocol,
          vhost: configuration.rabbitmq.vhost,
          heartbeat: 1,
        },
      ],
      queue: configuration.rabbitmq.queue,
    },
  });

  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
