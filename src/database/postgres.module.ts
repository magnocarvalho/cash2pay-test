import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationEnv } from '../configurations/config-env';
import { ConfigurationModule } from '../configurations/config.module';
import { UniversityEntity } from 'src/universities/university.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (env: ConfigurationEnv) => ({
        type: 'postgres',
        entities: [UniversityEntity],
        synchronize: env.database.synchronize,
        autoLoadEntities: true,
        logger: 'advanced-console',
        logging: ['error', 'warn'],
        dropSchema: false,
        ssl: env.database.ssl,
        username: env.database.username,
        password: env.database.password,
        database: env.database.database,
        host: env.database.host,
        port: env.database.port,
      }),
      inject: [ConfigurationEnv],
    }),
  ],
})
export class TypeOrmConnectorModule {}
