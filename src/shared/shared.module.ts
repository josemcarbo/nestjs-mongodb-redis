import { Module } from '@nestjs/common';
import { RedisWrapService } from './redis/redis.service';

@Module({
  providers: [RedisWrapService],
  exports: [RedisWrapService],
})
export class SharedModule {}
