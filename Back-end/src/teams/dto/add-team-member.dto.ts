import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTeamMemberDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 'testUserId',
    required: true,
  })
  @IsNotEmpty({ message: '사용자 ID는 필수입니다.' })
  @IsString({ message: '사용자 ID는 문자열이어야 합니다.' })
  user_id: string;
}
