import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

export const RedisProvider: Provider = {
    provide: 'REDIS',
    useFactory: async () => {
        const redis = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        });

        redis.on('connect', () => {
            console.log('Connected to Redis');
        });

        redis.on('error', (err) => {
            console.error('Redis error', err);
        });

        return redis;
    },
};