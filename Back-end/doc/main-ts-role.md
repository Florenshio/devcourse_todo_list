---
type:
  - note
CMDS: 
index: 
aliases: 
tags: 
links:
---
# TypeScript 프로젝트에서 main.ts 파일의 역할

## main.ts 파일이란?

TypeScript 프로젝트, 특히 NestJS와 같은 프레임워크에서 `main.ts` 파일은 애플리케이션의 진입점(entry point)으로 작동합니다. 이 파일은 애플리케이션의 부트스트랩 과정을 담당하며, 애플리케이션이 시작될 때 가장 먼저 실행되는 코드를 포함합니다.

## main.ts 파일의 주요 역할

### 1. 애플리케이션 인스턴스 생성

```typescript
const app = await NestFactory.create(AppModule);
```

NestJS에서는 `NestFactory.create()` 메서드를 사용하여 애플리케이션 인스턴스를 생성합니다. 이 메서드는 루트 모듈(일반적으로 `AppModule`)을 인자로 받아 애플리케이션의 의존성 트리를 구성합니다.

### 2. 전역 미들웨어 및 파이프 설정

```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));
```

애플리케이션 전체에 적용될 미들웨어, 파이프, 필터, 인터셉터 등을 설정합니다. 위 예시에서는 입력 데이터 검증을 위한 `ValidationPipe`를 전역으로 설정하고 있습니다.

### 3. 애플리케이션 수준의 설정

```typescript
// CORS 설정
app.enableCors();

// API 접두사 설정
app.setGlobalPrefix('api');
```

CORS(Cross-Origin Resource Sharing) 정책, API 경로 접두사, 버전 관리 등 애플리케이션 수준의 설정을 구성합니다.

### 4. 문서화 도구 설정

```typescript
// Swagger 설정
const config = new DocumentBuilder()
  .setTitle('Todo List API')
  .setDescription('Todo 리스트 관리를 위한 API 문서')
  .setVersion('1.0')
  .addTag('users', '사용자 관리 API')
  // ... 기타 설정
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
```

Swagger와 같은 API 문서화 도구를 설정합니다. 이를 통해 API 엔드포인트, 요청/응답 스키마, 인증 방식 등을 문서화할 수 있습니다.

### 5. 애플리케이션 실행

```typescript
await app.listen(process.env.PORT ?? 3000);
console.log(`애플리케이션이 실행 중입니다: ${await app.getUrl()}`);
```

특정 포트에서 애플리케이션을 실행하고, 필요한 경우 실행 정보를 로깅합니다.

## main.ts 파일의 구조화 방법

애플리케이션이 복잡해지면 `main.ts` 파일도 복잡해질 수 있습니다. 이 경우 다음과 같은 방법으로 코드를 구조화할 수 있습니다:

### 1. 기능별 함수 분리

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  setupGlobalPipes(app);
  setupCors(app);
  setupSwagger(app);
  
  await app.listen(3000);
}

function setupGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({
    // ... 파이프 설정
  }));
}

function setupCors(app: INestApplication) {
  app.enableCors({
    // ... CORS 설정
  });
}

function setupSwagger(app: INestApplication) {
  // ... Swagger 설정
}

bootstrap();
```

### 2. 설정 모듈 분리

```typescript
// config/app.config.ts
export function setupApp(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({
    // ... 파이프 설정
  }));
  app.enableCors();
  app.setGlobalPrefix('api');
}

// config/swagger.config.ts
export function setupSwagger(app: INestApplication) {
  // ... Swagger 설정
}

// main.ts
import { setupApp } from './config/app.config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  setupApp(app);
  setupSwagger(app);
  
  await app.listen(3000);
}

bootstrap();
```

## 다른 프레임워크에서의 main.ts

### Express.js

Express.js에서는 일반적으로 `app.js` 또는 `index.js`가 진입점 역할을 하지만, TypeScript를 사용하는 경우 `main.ts`를 사용할 수 있습니다:

```typescript
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우트 설정
app.use('/api', routes);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### Angular

Angular에서 `main.ts`는 애플리케이션의 진입점으로, 루트 모듈을 부트스트랩하는 역할을 합니다:

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

## 결론

`main.ts` 파일은 TypeScript 프로젝트에서 애플리케이션의 진입점 역할을 하며, 애플리케이션의 초기 설정과 부트스트랩 과정을 담당합니다. 이 파일은 애플리케이션의 전체적인 구성을 정의하고, 필요한 모듈과 설정을 로드하여 애플리케이션이 올바르게 시작될 수 있도록 합니다.

NestJS와 같은 프레임워크에서는 `main.ts` 파일에 Swagger 설정과 같은 애플리케이션 수준의 설정을 포함하는 것이 일반적이며, 이는 프레임워크의 권장 사항에 따른 것입니다. 애플리케이션이 복잡해지면 코드를 기능별로 분리하여 구조화하는 것이 좋습니다.
