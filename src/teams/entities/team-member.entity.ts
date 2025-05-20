import { ApiProperty } from '@nestjs/swagger';

export class TeamMember {
  @ApiProperty({ description: '팀 멤버 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '팀 ID', example: 1 })
  team_id: number;

  @ApiProperty({ description: '사용자 ID', example: 2 })
  user_id: number;

  @ApiProperty({
    description: '사용자 정보',
    example: {
      username: '사용자이름'
    },
    required: false
  })
  user?: { username: string };
}
