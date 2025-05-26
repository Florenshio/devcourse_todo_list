# Todo List Backend API

NestJS 기반의 Todo 리스트 관리 백엔드 애플리케이션입니다. 사용자, 팀, 태스크 관리를 위한 RESTful API를 제공합니다.

## 기능

- **사용자 관리**: 회원가입, 로그인, 사용자 정보 조회
- **인증**: JWT 기반 인증 시스템 (쿠키에 토큰 저장)
- **팀 관리**: 팀 생성, 팀원 관리, 팀 정보 조회
- **태스크 관리**: 할 일 생성, 조회, 수정, 삭제

## 기술 스택

- **Framework**: NestJS
- **Database**: MySQL (Railway.app 호스팅)
- **ORM**: TypeORM
- **Authentication**: Passport, JWT
- **API Documentation**: Swagger
- **Validation**: class-validator, class-transformer
- **Password Encryption**: bcrypt

## 시작하기

### 사전 요구사항

- Node.js (v16 이상)
- npm 또는 yarn
- MySQL 데이터베이스 (Railway.app 또는 로컬)

### 설치

1. 저장소 클론

```bash
git clone <repository-url>
cd devcourse_todo_list-backend
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

```
# 데이터베이스 설정
DATABASE_HOST=your_database_host
DATABASE_PORT=your_database_port
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=your_database_name

# JWT 설정
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=your_jwt_expiration

# 서버 설정
PORT=your_port
```

### 실행

개발 모드로 실행:

```bash
npm run start:dev
```

프로덕션 빌드:

```bash
npm run build
npm run start:prod
```

### Swagger 문서

애플리케이션 실행 후 브라우저에서 다음 URL에 접속하여 API 문서를 확인할 수 있습니다:

```
http://localhost:your_port/api-docs
```

## 프로젝트 구조

```
src/
├── auth/                # 인증 관련 모듈
├── common/              # 공통 기능 (파이프, 필터 등)
├── tasks/               # 태스크 관리 모듈
├── teams/               # 팀 관리 모듈
├── users/               # 사용자 관리 모듈
├── app.module.ts        # 애플리케이션 루트 모듈
├── main.ts              # 애플리케이션 진입점
└── swagger-static.ts    # Swagger 설정
```

## 참고 사항

- API 엔드포인트는 모두 `/api` 접두사가 붙습니다.
- 인증이 필요한 API는 쿠키에 저장된 JWT 토큰을 사용합니다.
- 비밀번호는 bcrypt를 사용하여 암호화됩니다.
- Railway.app을 사용하여 데이터베이스를 호스팅하고 있습니다.