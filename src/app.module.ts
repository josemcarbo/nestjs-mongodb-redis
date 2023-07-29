import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { ApiModule } from './modules/api.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true
    }),
    ApiModule,
  ],
})
export class AppModule {}
