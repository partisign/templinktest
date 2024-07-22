import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TemplinkService } from './templink.service';
import * as dotenv from 'dotenv';
import { CreateLinkDto, GetLinkDto } from './templink.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
dotenv.config();
const appHost = process.env.APP_HOST || 'localhost';
const appPort = process.env.APP_PORT || 3000;

@ApiTags('temporary link')
@Controller('templink')
export class TemplinkController {
    constructor(private readonly tempLinkService: TemplinkService) { }

    @Post()
    @ApiBody({ type: CreateLinkDto })
    @ApiResponse({ status: 201, description: 'Ссылка успешно создана', schema: { example: { link: `http://${appHost}:${appPort}/templink/someUUIDV4string'` } } })
    async createLink(@Body() createLinkDto: CreateLinkDto): Promise<{ link: string }> {
        return await this.tempLinkService.createLink(createLinkDto.value)
    }

    @Get(':id')
    @ApiParam({ name: 'id', required: true, description: 'Уникальный идентификатор ссылки' })
    @ApiResponse({ status: 200, description: 'Данные запрошены успешно', type: GetLinkDto })
    @ApiResponse({ status: 404, description: 'Ссылка не найдена или уже была использована' })
    async getLink(@Param('id') id: string): Promise<GetLinkDto> {
        const value = await this.tempLinkService.getValueById(id);
        return { value }
    }
}
