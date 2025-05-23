import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TeamMember } from './team-member.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Team {
  @ApiProperty({ description: '팀 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '팀 이름', example: '팀 이름' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ description: '생성자 ID', example: 1 })
  @Column()
  created_by: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  creator: User;

  @ApiProperty({
    description: '팀 멤버 목록',
    type: [TeamMember]
  })
  @OneToMany(() => TeamMember, teamMember => teamMember.team)
  members: TeamMember[];

  @ApiProperty({
    description: '할 일 목록',
    type: [Task]
  })
  @OneToMany(() => Task, task => task.team)
  tasks: Task[];
}
