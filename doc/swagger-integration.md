---
type:
  - note
CMDS: 
index: 
aliases: 
tags: 
links:
---
# NestJS에서 Swagger를 이용한 API 문서화

## Swagger와 API 코드 연동의 일반적인 패턴

NestJS 프로젝트에서 컨트롤러 코드에 `@ApiTags`, `@ApiOperation`, `@ApiResponse` 등의 Swagger 데코레이터를 직접 추가하는 방식은 다음과 같은 이유로 업계에서 널리 사용되고 있습니다:

### 1. 코드와 문서의 일치성 보장

```typescript
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
```

이런 방식은 코드와 문서가 항상 동기화되도록 보장합니다. API 엔드포인트가 변경되면 문서도 자동으로 업데이트됩니다.

### 2. DRY(Don't Repeat Yourself) 원칙 준수

DTO 클래스에 정의된 `@ApiProperty` 데코레이터는 API 문서에 자동으로 반영됩니다:

```typescript
export class CreateTeamDto {
  @ApiProperty({
    description: '팀 이름',
    example: '팀 이름',
    required: true,
  })
  @IsNotEmpty({ message: '팀 이름은 필수입니다.' })
  @IsString({ message: '팀 이름은 문자열이어야 합니다.' })
  name: string;
}
```

이렇게 하면 DTO 정의와 API 문서가 중복 없이 유지됩니다.

### 3. 개발 효율성 향상

코드를 작성하면서 동시에 문서화할 수 있어 개발 효율성이 향상됩니다. 별도의 문서 작성 과정이 필요 없습니다.

### 4. 타입 안전성

TypeScript와 NestJS의 타입 시스템과 결합하여 API 문서의 타입 안전성을 보장합니다.

## 대안적인 접근법

물론 다른 접근법도 존재합니다:

### 1. 별도의 문서 파일 관리

OpenAPI 명세를 YAML 또는 JSON 파일로 별도 관리하는 방식도 있습니다. 하지만 이 방식은 코드와 문서 간의 불일치가 발생할 위험이 있습니다.

### 2. 코드 주석 기반 문서화

JSDoc 스타일의 주석을 사용하여 문서를 생성하는 방식도 있습니다. 하지만 NestJS와 Swagger의 통합은 데코레이터 기반 접근법이 더 자연스럽습니다.

## 대규모 프로젝트에서의 고려사항

대규모 프로젝트에서는 Swagger 데코레이터가 컨트롤러 코드를 복잡하게 만들 수 있습니다. 이 경우 다음과 같은 방법을 고려할 수 있습니다:

### 1. 문서화 로직 분리

```typescript
// teams.swagger.ts
export const TeamSwaggerDocs = {
  createTeam: {
    operation: { summary: '팀 생성', description: '새로운 팀 생성' },
    response: {
      status: 201,
      description: '팀 생성 성공',
      schema: { /* ... */ },
    }
  },
  // ...
};

// teams.controller.ts
@ApiOperation(TeamSwaggerDocs.createTeam.operation)
@ApiResponse(TeamSwaggerDocs.createTeam.response)
@Post()
createTeam(@Body() createTeamDto: CreateTeamDto) {
  // ...
}
```

### 2. 커스텀 데코레이터 생성

```typescript
// swagger.decorators.ts
export function ApiCreateTeam() {
  return applyDecorators(
    ApiOperation({ summary: '팀 생성', description: '새로운 팀 생성' }),
    ApiResponse({
      status: 201,
      description: '팀 생성 성공',
      schema: { /* ... */ },
    })
  );
}

// teams.controller.ts
@ApiCreateTeam()
@Post()
createTeam(@Body() createTeamDto: CreateTeamDto) {
  // ...
}
```

## 결론

Swagger 데코레이터를 컨트롤러 코드에 직접 추가하는 방식은 현대적인 백엔드 개발에서 매우 일반적이고 권장되는 접근법입니다. 이 방식은 코드와 문서의 일치성을 보장하고, 개발 효율성을 향상시키며, 타입 안전성을 제공합니다.

NestJS 공식 문서에서도 이 방식을 권장하며, 많은 기업과 개발자들이 이 패턴을 따르고 있습니다. 특히 NestJS와 Swagger의 통합은 매우 자연스럽고 효율적으로 설계되어 있어, 이 방식을 사용하는 것이 좋은 선택입니다.
