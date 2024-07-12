import { UniversityEntity } from '@infrastructure/entity/universities/university.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
