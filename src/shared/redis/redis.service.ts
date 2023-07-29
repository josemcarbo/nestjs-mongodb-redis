import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    return this.cacheManager.set(
      key,
      value,
      Number(process.env.STORAGE_CACHE_TTL || 86400)
    );
  }

  async del(key: string): Promise<void> {
    return this.cacheManager.del(key);
  }
}
