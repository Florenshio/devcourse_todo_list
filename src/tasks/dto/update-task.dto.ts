import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    description: '수정된 할 일 제목',
    example: '수정된 할 일 제목',
    required: true,
  })
  @IsNotEmpty({ message: '할 일 제목은 필수입니다.' })
  @IsString({ message: '할 일 제목은 문자열이어야 합니다.' })
  title: string;
}
