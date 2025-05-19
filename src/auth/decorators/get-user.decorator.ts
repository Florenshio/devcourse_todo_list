import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user);
    return request.user; 
    // request.user라는 이름 자체는 Passport.js 라이브러이에서 정한 규칙
    // request.user에는 jwt.strategy의 validate 메소드에서 반환한 객체가 담김
  },
);
