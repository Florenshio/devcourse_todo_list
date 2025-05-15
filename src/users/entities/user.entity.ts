import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: '사용자 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '사용자 이름', example: '사용자이름' })
  username: string;

  @ApiProperty({ description: '생성 일시', example: '2025-05-13T11:15:15+09:00' })
  created_at: Date;
}
