import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { TemplinkModule } from './templink/templink.module';

@Module({
  imports: [RedisModule, TemplinkModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
