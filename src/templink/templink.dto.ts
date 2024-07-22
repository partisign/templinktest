import { ApiProperty } from "@nestjs/swagger";

export class CreateLinkDto {
    @ApiProperty({ example: 'Ваша строка' })
    value: string;
}
export class GetLinkDto {
    @ApiProperty({ example: 'Ваша строка' })
    value: string;
}