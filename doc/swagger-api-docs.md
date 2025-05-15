---
type:
  - note
CMDS: 
index: 
aliases: 
tags: 
links:
---
# Todo List API 문서화 프로젝트

이 문서는 NestJS와 Swagger를 이용하여 구현된 Todo List API 문서화 프로젝트에 대한 설명입니다.

## 프로젝트 구조

```
src/
├── main.ts                     # 애플리케이션 진입점 및 Swagger 설정
├── app.module.ts               # 메인 모듈 설정
├── app.controller.ts           # 기본 컨트롤러
├── app.service.ts              # 기본 서비스
├── auth/                       # 인증 관련 디렉토리
│   ├── auth.module.ts          # 인증 모듈
│   ├── decorators/            
│   │   └── get-user.decorator.ts # 사용자 정보 가져오는 데코레이터
│   └── guards/                
│       └── jwt-auth.guard.ts   # JWT 인증 가드
├── users/                      # 사용자 관련 디렉토리
│   ├── dto/                   
│   │   ├── create-user.dto.ts  # 회원가입 DTO
│   │   └── login-user.dto.ts   # 로그인 DTO
│   ├── entities/              
│   │   └── user.entity.ts      # 사용자 엔티티
│   └── users.controller.ts     # 사용자 관리 API 컨트롤러
├── teams/                      # 팀 관련 디렉토리
│   ├── dto/                   
│   │   ├── create-team.dto.ts  # 팀 생성 DTO
│   │   └── add-team-member.dto.ts # 팀원 추가 DTO
│   ├── entities/              
│   │   ├── team.entity.ts      # 팀 엔티티
│   │   └── team-member.entity.ts # 팀 멤버 엔티티
│   └── teams.controller.ts     # 팀 관리 API 컨트롤러
└── tasks/                      # 할 일 관련 디렉토리
    ├── dto/                   
    │   ├── create-task.dto.ts  # 할 일 생성 DTO
    │   ├── update-task.dto.ts  # 할 일 수정 DTO
    │   └── update-task-status.dto.ts # 할 일 상태 변경 DTO
    ├── entities/              
    │   ├── task.entity.ts      # 할 일 엔티티
    │   └── task-action.entity.ts # 할 일 액션 엔티티
    └── tasks.controller.ts     # 할 일 관리 API 컨트롤러
```

## 주요 파일 설명

### 1. 메인 설정

#### main.ts
- Swagger 설정 및 API 문서화를 위한 기본 설정
- API 접두사 설정 (`/api`)
- Swagger UI 경로 설정 (`/api-docs`)
- 태그 설정 (users, teams, tasks, actions)
- JWT 인증 설정

#### app.module.ts
- 애플리케이션의 메인 모듈
- 컨트롤러 및 서비스 등록
- AuthModule 임포트

### 2. 사용자 관리 (Users)

#### users/dto/create-user.dto.ts
- 회원가입 시 필요한 데이터 정의
- username, password 필드 포함
- class-validator를 이용한 유효성 검사

#### users/dto/login-user.dto.ts
- 로그인 시 필요한 데이터 정의
- username, password 필드 포함

#### users/entities/user.entity.ts
- 사용자 정보를 표현하는 엔티티
- id, username, created_at 필드 포함

#### users/users.controller.ts
- 사용자 관련 API 엔드포인트 정의
- 회원가입 (`POST /api/users/register`)
- 로그인 (`POST /api/users/login`)
- 사용자 정보 조회 (`GET /api/users/me`)

### 3. 팀 관리 (Teams)

#### teams/dto/create-team.dto.ts
- 팀 생성 시 필요한 데이터 정의
- name 필드 포함

#### teams/dto/add-team-member.dto.ts
- 팀원 추가 시 필요한 데이터 정의
- user_id 필드 포함

#### teams/entities/team.entity.ts
- 팀 정보를 표현하는 엔티티
- id, name, created_by 필드 포함
- members 배열 포함 (선택적)

#### teams/entities/team-member.entity.ts
- 팀 멤버 정보를 표현하는 엔티티
- id, team_id, user_id 필드 포함

#### teams/teams.controller.ts
- 팀 관련 API 엔드포인트 정의
- 팀 생성 (`POST /api/teams`)
- 팀 목록 조회 (`GET /api/teams`)
- 팀 상세 조회 (`GET /api/teams/{team_id}`)
- 팀원 추가 (`POST /api/teams/{team_id}/members`)
- 팀원 삭제 (`DELETE /api/teams/{team_id}/members/{user_id}`)

### 4. 할 일 관리 (Tasks)

#### tasks/dto/create-task.dto.ts
- 할 일 생성 시 필요한 데이터 정의
- title, team_id(선택적) 필드 포함

#### tasks/dto/update-task.dto.ts
- 할 일 수정 시 필요한 데이터 정의
- title 필드 포함

#### tasks/dto/update-task-status.dto.ts
- 할 일 상태 변경 시 필요한 데이터 정의
- status 필드 포함 (todo, done)

#### tasks/entities/task.entity.ts
- 할 일 정보를 표현하는 엔티티
- id, title, status, created_by, team_id 필드 포함

#### tasks/entities/task-action.entity.ts
- 할 일 액션 정보를 표현하는 엔티티
- id, task_id, action_type, performed_by, performed_at 필드 포함

#### tasks/tasks.controller.ts
- 할 일 관련 API 엔드포인트 정의
- 할 일 생성 (`POST /api/tasks`)
- 할 일 목록 조회 (`GET /api/tasks`)
- 할 일 상태 변경 (`PATCH /api/tasks/{task_id}/status`)
- 할 일 수정 (`PUT /api/tasks/{task_id}`)
- 할 일 삭제 (`DELETE /api/tasks/{task_id}`)
- 할 일 액션 로그 조회 (`GET /api/tasks/{task_id}/actions`)

### 5. 인증 관련 (Auth)

#### auth/decorators/get-user.decorator.ts
- 현재 인증된 사용자 정보를 가져오는 데코레이터

#### auth/guards/jwt-auth.guard.ts
- JWT 인증을 위한 가드
- 인증이 필요한 엔드포인트에 적용

#### auth/auth.module.ts
- 인증 관련 모듈
- JWT 모듈 및 Passport 모듈 설정

## API 문서 접근 방법

애플리케이션을 실행하면 다음 URL에서 Swagger UI를 통해 API 문서를 확인할 수 있습니다:
```
http://localhost:3000/api-docs
```

## 필요한 패키지

이 프로젝트는 다음과 같은 패키지들이 필요합니다:
- `@nestjs/swagger`: Swagger 문서화를 위한 패키지
- `class-validator`: DTO 유효성 검사를 위한 패키지
- `@nestjs/passport`: 인증을 위한 패키지
- `@nestjs/jwt`: JWT 토큰 처리를 위한 패키지
- `passport-jwt`: JWT 전략을 위한 패키지

## 참고 사항

현재 구현된 코드는 API 문서화를 위한 것으로, 실제 기능은 구현되어 있지 않습니다. 실제 기능 구현을 위해서는 다음과 같은 작업이 필요합니다:

1. 데이터베이스 연결 설정
2. 서비스 클래스 구현
3. 리포지토리 구현
4. 실제 비즈니스 로직 구현

또한, 현재는 JWT 인증 관련 코드가 일부만 구현되어 있으므로, 완전한 인증 시스템을 구축하기 위해서는 추가적인 작업이 필요합니다.
