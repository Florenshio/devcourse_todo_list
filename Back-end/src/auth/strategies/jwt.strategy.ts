import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const token = request?.cookies?.access_token;

          return token;
        }
      ]),
      ignoreExpiration: false, // 만료된 토큰 거부
      secretOrKey: process.env.JWT_SECRET ?? 'secretKey', // 환경 변수 사용 권장
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.usersService.findUserId(payload.user_id);
      if (!user) {
        throw new UnauthorizedException('접근 권한이 없습니다.');
      }
      return { id: user.id, user_id: user.user_id };
    } catch (error) {
      throw error;
    }
  }
}
