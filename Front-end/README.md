# todo-list 페이지

## 폴더 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── LoginForm.js    # 로그인 폼 컴포넌트
│   ├── SignupForm.js   # 회원가입 폼 컴포넌트
│   ├── TodoList.js     # 할 일 목록 컴포넌트
│   ├── Sidebar.js      # 팀 목록 사이드바 컴포넌트
│   ├── DeleteModal.js  # 삭제 확인 모달 컴포넌트
│   └── TeamModal.js    # 팀 생성 모달 컴포넌트
│
├── hooks/              # 커스텀 훅
│   ├── useAuth.js     # 인증 관련 로직 (로그인, 회원가입)
│   ├── useTodos.js    # 할 일 관련 로직 (CRUD)
│   └── useTeams.js    # 팀 관련 로직 (팀 목록, 생성)
│
├── pages/             # 페이지 컴포넌트
│   ├── login-page.js  # 로그인 페이지
│   ├── signup-page.js # 회원가입 페이지
│   └── todo-page.js   # 할 일 관리 페이지
│
├── styles/            # 스타일 파일
│   ├── index.css     # 전역 스타일
│   ├── auth.css      # 인증 관련 스타일
│   ├── todo.css      # 할 일 관련 스타일
│   └── modal.css     # 모달 관련 스타일
│
├── App.js            # 라우팅 설정
└── index.js          # 앱의 진입점
```

## 주요 기능

- 사용자 인증 (로그인/회원가입)
- 개인 할 일 관리
- 팀 생성 및 관리
- 팀별 할 일 관리
- 할 일 CRUD 기능
  - 생성 (Create)
  - 조회 (Read)
  - 수정 (Update)
  - 삭제 (Delete)

## 기술 스택

- React
- React Router
- Axios
- CSS
