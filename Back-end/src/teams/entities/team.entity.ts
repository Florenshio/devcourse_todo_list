import { ApiProperty } from '@nestjs/swagger';

export class Team {
  @ApiProperty({ description: '팀 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '팀 이름', example: '팀 이름' })
  name: string;

  @ApiProperty({ description: '생성자 ID', example: 1 })
  created_by: number;

  @ApiProperty({
    description: '팀 멤버 목록',
    example: [
      {
        id: 1,
        username: '사용자이름'
      }
    ],
    type: 'array',
    isArray: true,
    required: false
  })
  members?: { id: number; username: string }[];
}
