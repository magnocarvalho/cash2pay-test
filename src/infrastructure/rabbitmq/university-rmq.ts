import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { ConfigurationEnv } from '../configurations/config-enviroments';
import { ConfigurationModule } from '../configurations/config.module';

export const UniversityRmqProvider: ClientsProviderAsyncOptions = {
  name: 'UNIVERSITY',
  imports: [ConfigurationModule],
  inject: [ConfigurationEnv],
  useFactory: async (envConfig: ConfigurationEnv) => ({
    transport: Transport.RMQ,
    options: {
      urls: [
        {
          port: envConfig.rabbitmq.port,
          hostname: envConfig.rabbitmq.hostname,
          password: envConfig.rabbitmq.password,
          username: envConfig.rabbitmq.user,
          protocol: envConfig.rabbitmq.protocol,
          vhost: envConfig.rabbitmq.vhost,
        },
      ],
      queue: envConfig.rabbitmq.queue,
    },
  }),
};
