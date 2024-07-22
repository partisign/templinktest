import { Module } from '@nestjs/common';
import { TemplinkController } from './templink.controller';
import { TemplinkService } from './templink.service';

@Module({
    controllers: [TemplinkController],
    providers: [TemplinkService]
})
export class TemplinkModule { }
