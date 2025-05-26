# Todo List Application

Todo 리스트 애플리케이션으로, NestJS 백엔드와 React 프론트엔드로 구성되어 있습니다. 이 프로젝트는 사용자 인증, 개인 및 팀 기반 할 일 관리 기능을 제공합니다.

## 프로젝트 개요

이 애플리케이션은 다음과 같은 주요 기능을 제공합니다:

- **사용자 관리**: 회원가입, 로그인, 사용자 정보 조회
- **인증 시스템**: JWT 기반 인증 (쿠키에 토큰 저장)
- **팀 관리**: 팀 생성, 팀원 관리, 팀 정보 조회
- **할 일 관리**: 개인 및 팀 할 일 생성, 조회, 수정, 삭제

## 기술 스택

### 백엔드
- **Framework**: NestJS
- **Database**: MySQL (Railway.app 호스팅)
- **ORM**: TypeORM
- **Authentication**: Passport, JWT
- **API Documentation**: Swagger
- **Password Encryption**: bcrypt

### 프론트엔드
- **Framework**: React
- **Routing**: React Router
- **HTTP Client**: Axios
- **Styling**: CSS

## 프로젝트 구조

```
devcourse_todo_list/
├── Back-end/           # NestJS 백엔드 애플리케이션
├── Front-end/          # React 프론트엔드 애플리케이션
├── package.json        # 워크스페이스 설정 및 스크립트
└── README.md           
```

각 디렉토리에는 해당 부분에 대한 자세한 설명이 포함된 README.md 파일이 있습니다.

## 시작하기

### 사전 요구사항

- Node.js (v16 이상)
- npm 또는 yarn
- MySQL 데이터베이스 접속 정보

### 설치

모든 의존성을 한 번에 설치:

```bash
npm run install:all
```

또는 개별적으로 설치:

```bash
# 백엔드 의존성 설치
npm run install:backend

# 프론트엔드 의존성 설치
npm run install:frontend
```

### 환경 설정

1. Back-end 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

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

2. Front-end 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

```
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

### 실행

개발 모드에서 백엔드와 프론트엔드를 동시에 실행:

```bash
npm run dev
```

또는 개별적으로 실행:

```bash
# 백엔드 실행
npm run start:backend

# 프론트엔드 실행
npm run start:frontend
```

## API 접근

- 백엔드 API는 `http://localhost:3003/api`에서 접근 가능합니다.
- API 문서는 `http://localhost:3003/api-docs`에서 확인할 수 있습니다.
- 프론트엔드는 `http://localhost:3000`에서 접근 가능합니다.

## 참고 사항

- 모든 API 엔드포인트는 `/api` 접두사가 붙습니다.
- 인증이 필요한 API는 쿠키에 저장된 JWT 토큰을 사용합니다.

## 자세한 정보

- 백엔드에 대한 자세한 정보는 [Back-end/README.md](./Back-end/README.md)를 참조하세요.
- 프론트엔드에 대한 자세한 정보는 [Front-end/README.md](./Front-end/README.md)를 참조하세요.
