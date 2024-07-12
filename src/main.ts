import { ConfigurationEnv } from "@infrastructure/configurations/config-environments";
import { AllExceptionsRpcFilter } from "@infrastructure/filters/rpc-exception.filter";
import { LoggerFactory } from "@infrastructure/logger/logger-factory";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configuration = app.get(ConfigurationEnv);

  const logger = LoggerFactory(
    "Cash2Pay",
    configuration.logger.json,
    configuration.logger.level,
  );
  app.useLogger(logger);

  app.connectMicroservice({
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
      noAck: true,
      persistent: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new AllExceptionsRpcFilter());

  await app.listen(3000).then(() => {
    logger.verbose("Cash2Pay is running on port 3000");
  });
}
bootstrap();
