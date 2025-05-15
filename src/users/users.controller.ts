import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: '회원가입', description: '새로운 사용자 계정 생성' })
  @ApiResponse({
    status: 201,
    description: '사용자 생성 성공',
    schema: {
      example: {
        id: 1,
        username: '사용자이름',
        created_at: '2025-05-13T11:15:15+09:00',
      },
    },
  })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return { message: 'This action registers a new user' };
  }

  @ApiOperation({ summary: '로그인', description: '사용자 인증 및 토큰 발급' })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    schema: {
      example: {
        token: 'JWT_토큰',
        user: {
          id: 1,
          username: '사용자이름',
        },
      },
    },
  })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return { message: 'This action logs in a user' };
  }

  @ApiOperation({ summary: '사용자 정보 조회', description: '현재 로그인한 사용자 정보 조회' })
  @ApiResponse({
    status: 200,
    description: '사용자 정보 조회 성공',
    schema: {
      example: {
        id: 1,
        username: '사용자이름',
      },
    },
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@GetUser() user: any) {
    return { message: 'This action returns the user profile' };
  }
}
