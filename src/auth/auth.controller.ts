import { Body, Controller, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@ApiTags('authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    schema: {
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            user_id: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(loginDto);

    // JWT를 쿠키에 담기
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000, // 5분
      sameSite: 'lax', // CSRF 공격 방지하려면 'strict'
      secure: false, // 실제 production 환경에서는 https 사용 권장
    });

    return { user: result.user };

  }
}
