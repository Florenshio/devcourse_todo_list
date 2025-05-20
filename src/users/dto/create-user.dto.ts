import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 이름',
    example: '사용자이름',
    required: true,
  })
  @IsNotEmpty({ message: '사용자 이름은 필수입니다.' })
  @IsString({ message: '사용자 이름은 문자열이어야 합니다.' })
  user_id: string;

  @ApiProperty({
    description: '비밀번호',
    example: '비밀번호',
    required: true,
  })
  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;
}
