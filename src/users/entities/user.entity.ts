import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { TeamMember } from '../../teams/entities/team-member.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @ApiProperty({ description: '사용자 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '사용자 이름', example: '사용자이름' })
  @Column({ type: 'varchar', length: 50, unique: true })
  user_id: string;

  @ApiProperty({ description: "사용자 비밀번호", example: "1234" })
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty({ description: '생성 일시', example: '2025-05-13T11:15:15+09:00' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    description: '팀 목록',
    type: [Team]
  })
  @OneToMany(() => Team, team => team.creator)
  teams: Team[];

  @ApiProperty({
    description: '팀 멤버 목록',
    type: [TeamMember]
  })
  @OneToMany(() => TeamMember, teamMember => teamMember.user)
  teamMembers: TeamMember[];

  @ApiProperty({
    description: '할 일 목록',
    type: [Task]
  })
  @OneToMany(() => Task, task => task.creator)
  tasks: Task[];
}
