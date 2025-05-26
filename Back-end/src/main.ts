import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import { AppExceptionFilter } from './common/filters/app-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 쿠키 파서 미들웨어 등록
  app.use(cookieParser());
  
  // 커스텀 ValidationPipe 설정
  app.useGlobalPipes(new CustomValidationPipe());

  // 전역 예외 필터 설정
  app.useGlobalFilters(new AppExceptionFilter());
  
  // CORS 설정
  app.enableCors({
    origin: true,
    credentials: true
  });
  
  // API 접두사 설정
  app.setGlobalPrefix('api');
  
  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Todo List API')
    .setDescription('Todo 리스트 관리를 위한 API 문서')
    .setVersion('1.0')
    .addTag('users', '사용자 관리 API')
    .addTag('teams', '팀 관리 API')
    .addTag('tasks', '할 일 관리 API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: '인증을 위한 JWT 토큰을 입력하세요',
        in: 'header',
      },
      'access-token',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(process.env.PORT ?? 3003);
  console.log(`애플리케이션이 실행 중입니다: ${await app.getUrl()}`);
  console.log(`Swagger 문서: ${await app.getUrl()}/api-docs`);
}
bootstrap();
