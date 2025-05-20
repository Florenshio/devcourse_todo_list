# 비밀번호 암호화 방식 비교: bcrypt vs crypto(PBKDF2)

이 문서는 Node.js에서 사용할 수 있는 두 가지 주요 비밀번호 암호화 방식인 `bcrypt`와 Node.js 내장 `crypto` 모듈의 PBKDF2를 비교합니다.

## 1. 개요

### bcrypt
- 1999년에 개발된 비밀번호 해싱 함수
- Blowfish 암호화 알고리즘을 기반으로 설계됨
- 특별히 비밀번호 저장을 위해 설계됨
- npm 패키지로 설치 필요: `npm install bcrypt`

### crypto (PBKDF2)
- Node.js 내장 암호화 모듈
- PBKDF2(Password-Based Key Derivation Function 2)는 비밀번호 기반 키 유도 함수
- 일반적인 암호화 작업을 위한 다양한 기능 제공
- 별도 설치 불필요 (Node.js 내장)

## 2. 사용 방법 비교

### bcrypt 사용 예시
```javascript
const bcrypt = require('bcrypt');

// 비밀번호 해싱
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// 비밀번호 검증
async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
```

### crypto (PBKDF2) 사용 예시
```javascript
const crypto = require('crypto');

// 비밀번호 해싱
function hashPassword(password) {
  const salt = crypto.randomBytes(64).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  return `${hash}.${salt}`; // 해시와 솔트를 함께 저장
}

// 비밀번호 검증
function verifyPassword(password, storedPassword) {
  const [hash, salt] = storedPassword.split('.');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  return hash === verifyHash;
}
```

## 3. 주요 차이점

| 특성 | bcrypt | crypto (PBKDF2) |
|------|--------|-----------------|
| **알고리즘** | Blowfish 기반 | 반복적 해시 함수 적용 |
| **설치** | 외부 패키지 필요 | Node.js 내장 |
| **소금(Salt)** | 자동 생성 및 관리 | 수동 생성 및 관리 필요 |
| **계산 특성** | 메모리 하드(memory-hard) | CPU 집약적 |
| **병렬 공격 저항성** | 높음 | 상대적으로 낮음 |
| **작업 요소 조정** | 비용 매개변수(cost parameter) | 반복 횟수(iterations) |
| **결과 형식** | 단일 문자열(소금 포함) | 해시와 소금 별도 관리 필요 |
| **현대적 보안 표준** | 높음 | 중간 (충분한 반복 횟수 필요) |

## 4. 장단점

### bcrypt 장점
- 소금 생성 및 관리가 자동화됨
- 단일 문자열로 결과 반환 (DB에 하나의 필드만 필요)
- 병렬 공격에 강한 저항성
- 비밀번호 해싱에 특화된 설계
- 업계 표준으로 널리 사용됨

### bcrypt 단점
- 외부 패키지 의존성 추가
- 일부 환경에서 네이티브 바인딩 문제 가능성
- Node.js 버전 호환성 문제 가능성

### crypto (PBKDF2) 장점
- Node.js 내장으로 추가 의존성 없음
- 다양한 해시 알고리즘 선택 가능
- 반복 횟수를 세밀하게 조정 가능
- 더 넓은 암호화 기능 제공

### crypto (PBKDF2) 단점
- 소금을 별도로 관리해야 함
- 병렬 공격에 상대적으로 취약
- 구현이 더 복잡함 (소금 생성, 저장, 검증 로직)
- 최신 보안 권장사항에 비해 덜 강력할 수 있음

## 5. NestJS에서의 사용

### bcrypt 사용 (NestJS)
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { user_id, password } = createUserDto;
    
    // 비밀번호 암호화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // 새 유저 객체 생성
    const newUser = this.userRepository.create({
      user_id,
      password: hashedPassword
    });
    
    // DB에 저장
    return this.userRepository.save(newUser);
  }
}
```

### crypto 사용 (NestJS)
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { user_id, password } = createUserDto;
    
    // 비밀번호 암호화
    const salt = crypto.randomBytes(64).toString('base64');
    const hashedPassword = crypto.pbkdf2Sync(
      password, 
      salt, 
      10000, 
      64, 
      'sha512'
    ).toString('base64');
    
    // 새 유저 객체 생성
    const newUser = this.userRepository.create({
      user_id,
      password: `${hashedPassword}.${salt}` // 비밀번호와 salt를 함께 저장
    });
    
    // DB에 저장
    return this.userRepository.save(newUser);
  }
}
```

## 6. 결론 및 권장사항

### 권장 사용 시나리오

- **bcrypt 권장 상황**:
  - 새로운 프로젝트 시작 시
  - 비밀번호 보안이 중요한 애플리케이션
  - 간단한 구현을 원할 때
  - 업계 표준을 따르고 싶을 때

- **crypto (PBKDF2) 권장 상황**:
  - 외부 의존성을 최소화하고 싶을 때
  - 이미 crypto 모듈에 익숙할 때
  - 특정 해시 알고리즘이나 반복 횟수에 대한 세밀한 제어가 필요할 때
  - 더 넓은 암호화 기능이 필요할 때

### 최종 권장사항

두 방식 모두 적절하게 구성하면 안전하지만, 현대적인 보안 표준과 사용 편의성을 고려할 때 **bcrypt**가 일반적으로 더 권장됩니다. 그러나 이미 crypto 모듈에 익숙하고 적절한 반복 횟수(최소 10,000회 이상)를 사용한다면 PBKDF2도 충분히 안전한 선택입니다.

가장 중요한 것은 어떤 방식을 선택하든 **평문 비밀번호를 절대 저장하지 않는 것**입니다.
