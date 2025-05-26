import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UsersService } from './user/user.service';

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {}
  
  @ApiOperation({ summary: '회원가입', description: '새로운 사용자 계정 생성' })
  @ApiResponse({
    status: 201,
    description: '사용자 생성 성공',
    schema: {
      example: {
        id: 1,
        user_id: '사용자이름',
        created_at: '2025-05-13T11:15:15+09:00',
      },
    },
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
