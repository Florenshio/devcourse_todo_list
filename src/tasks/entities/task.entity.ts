import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  TODO = 'todo',
  DONE = 'done',
}

export class Task {
  @ApiProperty({ description: '할 일 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '할 일 제목', example: '할 일 제목' })
  title: string;

  @ApiProperty({ 
    description: '할 일 상태', 
    enum: TaskStatus, 
    example: TaskStatus.TODO 
  })
  status: TaskStatus;

  @ApiProperty({ description: '생성자 ID', example: 1 })
  created_by: number;

  @ApiProperty({ 
    description: '팀 ID (개인 할 일인 경우 null)', 
    example: 1, 
    nullable: true 
  })
  team_id: number | null;
}
