// swagger api static 문서용 json 생성
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Todo List API')
    .setDescription('Todo 리스트 관리를 위한 API 문서')
    .setVersion('1.0')
    .addTag('users', '사용자 관리 API')
    .addTag('teams', '팀 관리 API')
    .addTag('tasks', '할 일 관리 API')
    .addTag('actions', '액션 로그 API')
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
  
  // Swagger JSON 파일로 저장
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  
  await app.close();
}
bootstrap();