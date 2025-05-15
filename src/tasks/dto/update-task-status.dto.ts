import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum TaskStatus {
  TODO = 'todo',
  DONE = 'done',
}

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: '할 일 상태',
    example: 'done',
    enum: TaskStatus,
    required: true,
  })
  @IsNotEmpty({ message: '상태는 필수입니다.' })
  @IsEnum(TaskStatus, { message: '상태는 todo 또는 done이어야 합니다.' })
  status: TaskStatus;
}
