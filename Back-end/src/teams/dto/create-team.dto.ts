import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    description: '팀 이름',
    example: '팀 이름',
    required: true,
  })
  @IsNotEmpty({ message: '팀 이름은 필수입니다.' })
  @IsString({ message: '팀 이름은 문자열이어야 합니다.' })
  name: string;
}
