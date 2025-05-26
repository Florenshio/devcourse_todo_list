import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from './team.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class TeamMember {
  @ApiProperty({ description: '팀 멤버 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '팀 ID', example: 1 })
  @Column()
  team_id: number;

  @ApiProperty({ description: '사용자 ID', example: 2 })
  @Column()
  user_id: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: Team;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
