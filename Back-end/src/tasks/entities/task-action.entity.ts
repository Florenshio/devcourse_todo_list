import { ApiProperty } from '@nestjs/swagger';

export enum ActionType {
  EDIT = 'edit',
  DELETE = 'delete',
}

export class TaskAction {
  @ApiProperty({ description: '액션 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '할 일 ID', example: 1 })
  task_id: number;

  @ApiProperty({ 
    description: '액션 타입', 
    enum: ActionType, 
    example: ActionType.EDIT 
  })
  action_type: ActionType;

  @ApiProperty({ description: '수행자 ID', example: 1 })
  performed_by: number;

  @ApiProperty({ 
    description: '수행 시간', 
    example: '2025-05-13T11:15:15+09:00' 
  })
  performed_at: Date;

  @ApiProperty({
    description: '사용자 정보',
    example: {
      username: '사용자이름'
    }
  })
  user?: { username: string };
}
