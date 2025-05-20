import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: '할 일 제목',
    example: '할 일 제목',
    required: true,
  })
  @IsNotEmpty({ message: '할 일 제목은 필수입니다.' })
  @IsString({ message: '할 일 제목은 문자열이어야 합니다.' })
  title: string;

  @ApiProperty({
    description: '팀 ID (개인 할 일인 경우 null)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: '팀 ID는 정수여야 합니다.' })
  team_id?: number;
}
