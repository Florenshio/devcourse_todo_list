import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddTeamMemberDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 2,
    required: true,
  })
  @IsNotEmpty({ message: '사용자 ID는 필수입니다.' })
  @IsInt({ message: '사용자 ID는 정수여야 합니다.' })
  user_id: number;
}
