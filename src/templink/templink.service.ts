import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';

@Injectable()
export class TemplinkService {

    constructor(@Inject('REDIS') private readonly redis: Redis) { }

    async createLink(value: string): Promise<{ link: string }> {
        let id = uuidv4();
        while (await this.redis.exists(id)) {
            id = uuidv4();
        }
        await this.redis.set(id, value);
        return { link: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/templink/${id}` };
    }

    async getValueById(id: string): Promise<string> {
        const value = await this.redis.get(id);
        if (!value) {
            throw new NotFoundException('Такой ссылки не не существует');
        }
        await this.redis.del(id);
        return value;
    }
}
