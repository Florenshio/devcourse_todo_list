---
type:
  - note
CMDS: 
index: 
aliases: 
tags: 
links:
---
# NestJS의 모듈 시스템 이해하기

## app.module.ts 파일의 역할

`app.module.ts` 파일은 NestJS 애플리케이션의 루트 모듈을 정의하는 핵심 파일입니다. 이 파일은 애플리케이션의 구조와 의존성을 조직화하는 역할을 합니다.

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TeamsController } from './teams/teams.controller';
import { TasksController } from './tasks/tasks.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    UsersController,
    TeamsController,
    TasksController,
  ],
  providers: [AppService],
})
export class AppModule {}
```

### app.module.ts의 주요 역할

1. **애플리케이션 구조 정의**: 애플리케이션의 전체 구조를 정의하고, 다양한 모듈, 컨트롤러, 서비스 등을 조직화합니다.
2. **의존성 주입 설정**: NestJS의 의존성 주입(Dependency Injection) 시스템을 위한 설정을 제공합니다.
3. **모듈 가져오기**: 애플리케이션에서 사용할 다른 모듈들을 가져옵니다(imports).
4. **컨트롤러 등록**: API 엔드포인트를 처리할 컨트롤러들을 등록합니다.
5. **서비스 제공**: 비즈니스 로직을 처리할 서비스들을 제공자(providers)로 등록합니다.

## @Module 데코레이터 이해하기

`@Module` 데코레이터는 NestJS에서 모듈을 정의하는 데 사용되며, 다음과 같은 속성을 가집니다:

1. **imports**: 이 모듈에서 사용할 다른 모듈들을 가져옵니다.
2. **controllers**: 이 모듈에서 사용할 컨트롤러들을 등록합니다.
3. **providers**: 이 모듈에서 사용할 서비스 및 기타 제공자들을 등록합니다.
4. **exports**: 이 모듈에서 제공하는 기능 중 다른 모듈에서 사용할 수 있도록 내보낼 것들을 지정합니다.

### @Module 데코레이터와 AppModule 클래스의 관계

`@Module` 데코레이터는 `AppModule` 클래스를 장식(decorate)하고 있습니다. 이 데코레이터는 TypeScript의 데코레이터 기능을 사용하여 클래스에 메타데이터를 추가합니다.

`AppModule` 클래스는 실제로 아무 메서드나 속성을 구현할 필요가 없습니다. 이 클래스는 단지 NestJS의 의존성 주입 시스템과 모듈 시스템을 위한 "컨테이너" 역할을 합니다. 모든 중요한 정보는 `@Module` 데코레이터의 메타데이터에 포함되어 있습니다.

```typescript
@Module({
  // 메타데이터
})
export class AppModule {
  // 클래스 본문은 비어 있음
}
```

이는 NestJS의 "선언적(declarative)" 프로그래밍 방식의 일부입니다. 이 방식에서는 "어떻게(how)" 동작하는지보다 "무엇을(what)" 하는지를 선언하는 것에 중점을 둡니다.

## imports 배열의 역할

`imports` 배열은 현재 모듈에서 사용하고자 하는 다른 모듈의 기능(서비스, 컨트롤러 등)을 가져오는 역할을 합니다.

```typescript
@Module({
  imports: [AuthModule],
  // ...
})
export class AppModule {}
```

이 코드에서 `AppModule`은 `AuthModule`을 가져오고 있습니다. 이것이 의미하는 바는:

1. `AuthModule`은 인증 관련 기능을 제공하는 별도의 모듈입니다.
2. `AppModule`은 이 `AuthModule`의 기능을 사용하고 싶어합니다.
3. `imports` 배열에 `AuthModule`을 포함함으로써, `AuthModule`이 제공하는 서비스나 기능을 `AppModule` 내의 컨트롤러나 서비스에서 사용할 수 있게 됩니다.

### 모듈 간의 의존성 관리

`imports` 배열은 모듈 간의 의존성을 관리하는 중요한 메커니즘입니다:

1. **코드 구조화**: 관련 기능을 별도의 모듈로 분리하여 코드를 더 잘 구조화할 수 있습니다.
2. **재사용성**: 한 번 정의한 모듈은 여러 다른 모듈에서 재사용할 수 있습니다.
3. **의존성 명시**: 어떤 모듈이 어떤 다른 모듈에 의존하는지 명확하게 표현할 수 있습니다.

### 일상적인 비유로 이해하기

`imports`를 일상적인 예로 설명하자면:

- `AppModule`은 하나의 회사라고 생각할 수 있습니다.
- 이 회사 내에는 여러 부서(`controllers`)와 직원들(`providers`)이 있습니다.
- 그러나 때로는 외부 전문 업체(`imports`)의 서비스가 필요합니다.
- `imports` 배열에 모듈을 포함시키는 것은 외부 전문 업체와 계약을 맺어 그들의 서비스를 이용할 수 있게 되는 것과 같습니다.

## controllers 배열의 역할

`controllers` 배열은 해당 모듈에서 사용할 컨트롤러들을 등록하는 역할을 합니다. NestJS에서 컨트롤러는 클라이언트의 요청을 처리하고 응답을 반환하는 역할, 즉 라우팅된 엔드포인트의 로직을 담당합니다.

```typescript
@Module({
  controllers: [
    AppController,
    UsersController,
    TeamsController,
    TasksController,
  ],
  // ...
})
export class AppModule {}
```

### NestJS의 컨트롤러 등록 방식

NestJS에서는 컨트롤러를 모듈의 `controllers` 배열에 등록해야만 해당 컨트롤러가 라우팅 엔드포인트로 작동할 수 있습니다. 이는 NestJS의 선언적 프로그래밍 방식의 일부입니다.

```typescript
// teams.controller.ts
@ApiTags('teams')
@Controller('teams')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  @ApiOperation({ summary: '팀 생성', description: '새로운 팀 생성' })
  @ApiResponse({
    status: 201,
    description: '팀 생성 성공',
    schema: {
      example: {
        id: 1,
        name: '팀 이름',
        created_by: 1,
      },
    },
  })
  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto, @GetUser() user: any) {
    return { message: 'This action creates a new team' };
  }

  // 다른 메서드들...
}
```

### Express.js와의 비교

Express.js에서는 라우터를 다음과 같이 정의하고 사용합니다:

```javascript
// teamRoutes.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'This action creates a new team' });
});

module.exports = router;

// index.js
const express = require('express');
const app = express();
const teamRoutes = require('./teamRoutes');

app.use('/teams', teamRoutes);
app.listen(3000);
```

NestJS와 Express.js의 주요 차이점:

1. **구조화 방식**:
   - Express.js: 명령형(imperative) 방식으로, 직접 라우터를 생성하고 미들웨어를 연결합니다.
   - NestJS: 선언적(declarative) 방식으로, 데코레이터와 모듈 시스템을 통해 구조를 정의합니다.

2. **의존성 관리**:
   - Express.js: 의존성을 직접 관리해야 합니다(예: 서비스 인스턴스를 직접 생성).
   - NestJS: 의존성 주입 시스템을 통해 자동으로 의존성을 관리합니다.

3. **타입 안전성**:
   - Express.js: JavaScript 기반으로, 타입 안전성이 기본적으로 없습니다(TypeScript를 추가할 수 있음).
   - NestJS: TypeScript 기반으로, 기본적으로 타입 안전성을 제공합니다.

## providers 배열의 역할

`providers` 배열은 해당 모듈에서 사용할 서비스 및 기타 제공자들을 등록하는 역할을 합니다. 이러한 제공자들은 의존성 주입 시스템을 통해 컨트롤러나 다른 서비스에 주입될 수 있습니다.

```typescript
@Module({
  providers: [AppService],
  // ...
})
export class AppModule {}
```

서비스는 비즈니스 로직을 처리하는 역할을 하며, 데이터베이스 접근, 외부 API 호출 등의 작업을 담당합니다. 컨트롤러는 클라이언트의 요청을 받아 적절한 서비스에 위임하고, 그 결과를 반환합니다.

## 결론

NestJS의 모듈 시스템은 애플리케이션의 구조를 명확하게 정의하고 의존성을 관리하는 강력한 메커니즘을 제공합니다. `app.module.ts` 파일은 이러한 모듈 시스템의 중심에 있으며, 애플리케이션의 전체 구조를 정의합니다.

`@Module` 데코레이터를 통해 모듈의 구성 요소(imports, controllers, providers, exports)를 선언적으로 정의하고, NestJS 프레임워크는 이를 기반으로 애플리케이션을 구성합니다.

이러한 선언적 접근 방식은 코드의 가독성, 유지보수성, 테스트 용이성을 높이며, 대규모 애플리케이션 개발에 적합한 구조를 제공합니다.
