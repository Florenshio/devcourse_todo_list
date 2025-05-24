import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ErrorCode } from '../common/constants/error-codes';
import { AppException } from '../common/exceptions/app.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /* 로그인 */
  async login(loginDto: LoginDto) {
    const { user_id, password } = loginDto;
    
    // 사용자 찾기
    const user = await this.usersService.findUserId(user_id);
    if (!user) {
      throw new AppException(ErrorCode.USER_NOT_FOUND);
    }
    
    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppException(ErrorCode.INVALID_PASSWORD);
    }
    
    // JWT 토큰 생성
    const payload = { id: user.id, user_id: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        user_id: user.user_id,
      },
    };
  }
}
