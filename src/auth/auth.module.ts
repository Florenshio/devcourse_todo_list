import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // 실제 환경에서는 환경 변수로 관리해야 합니다
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [],
  exports: [],
})
export class AuthModule {}
