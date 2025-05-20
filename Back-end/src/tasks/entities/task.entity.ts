import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TaskStatus {
  TODO = 'todo',
  DONE = 'done',
}

@Entity()
export class Task {
  @ApiProperty({ description: '할 일 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '할 일 제목', example: '할 일 제목' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ 
    description: '할 일 상태', 
    enum: TaskStatus, 
    example: TaskStatus.TODO 
  })
  @Column({ type: 'varchar', length: 255 })
  status: TaskStatus;

  @ApiProperty({ description: '생성자 ID', example: 1 })
  @Column({ type: 'int' })
  created_by: number;

  @ApiProperty({ 
    description: '팀 ID (개인 할 일인 경우 null)', 
    example: 1, 
    nullable: true 
  })
  @Column({ type: 'int', nullable: true })
  team_id: number | null;
}
