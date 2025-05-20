---
type:
  - note
CMDS: 
index: 
aliases: 
tags: 
links:
---
# DTO와 Entity 개념 설명

## DTO (Data Transfer Object)

DTO는 데이터 전송 객체(Data Transfer Object)의 약자로, 주로 클라이언트와 서버 간의 데이터 교환을 위해 사용됩니다.

### DTO의 주요 특징:
1. **데이터 검증**: `class-validator` 등의 라이브러리를 사용하여 입력 데이터의 유효성을 검증합니다.
2. **데이터 형식 정의**: 클라이언트에서 서버로 전송되는 데이터의 형식을 명확하게 정의합니다.
3. **문서화**: Swagger와 같은 도구를 통해 API 문서에 요청/응답 형식을 명시합니다.
4. **계층 간 데이터 전달**: 컨트롤러와 서비스 계층 사이에서 데이터를 전달하는 용도로 사용됩니다.

### DTO 예시 (create-user.dto.ts):
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 이름',
    example: '사용자이름',
    required: true,
  })
  @IsNotEmpty({ message: '사용자 이름은 필수입니다.' })
  @IsString({ message: '사용자 이름은 문자열이어야 합니다.' })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: '비밀번호',
    required: true,
  })
  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;
}
```

이 DTO는 사용자 생성 시 필요한 데이터(username, password)를 정의하고, 각 필드에 대한 유효성 검증 규칙을 설정합니다.

## Entity (엔티티)

Entity는 데이터베이스의 테이블과 매핑되는 객체로, 데이터베이스의 레코드를 표현합니다.

### Entity의 주요 특징:
1. **데이터베이스 매핑**: TypeORM, Sequelize 등의 ORM을 통해 데이터베이스 테이블과 매핑됩니다.
2. **데이터 구조 정의**: 데이터베이스에 저장될 데이터의 구조를 정의합니다.
3. **관계 설정**: 다른 엔티티와의 관계(일대일, 일대다, 다대다 등)를 정의합니다.
4. **응답 형식**: API 응답으로 반환될 데이터의 형식을 정의하는 데에도 사용될 수 있습니다.

### Entity 예시 (user.entity.ts) - 데이터베이스 연동:
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Task } from '../../tasks/entities/task.entity';
import { TaskAction } from '../../tasks/entities/task-action.entity';
import { TeamMember } from '../../teams/entities/team-member.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @ApiProperty({ description: '사용자 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '사용자 이름', example: '사용자이름' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: '비밀번호', example: '비밀번호' })
  @Column()
  @Exclude({ toPlainOnly: true }) // 응답에서 비밀번호 제외
  password: string;

  @ApiProperty({ description: '생성 일시', example: '2025-05-13T11:15:15+09:00' })
  @CreateDateColumn()
  created_at: Date;

  // 관계 설정
  @OneToMany(() => Team, (team) => team.created_by)
  teams: Team[];

  @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
  teamMemberships: TeamMember[];

  @OneToMany(() => Task, (task) => task.created_by)
  tasks: Task[];

  @OneToMany(() => TaskAction, (taskAction) => taskAction.performed_by)
  taskActions: TaskAction[];
}
```

이 Entity는 사용자 정보를 표현하며, TypeORM 데코레이터를 사용하여 데이터베이스의 users 테이블과 매핑됩니다. 
- `@Entity`: 이 클래스가 데이터베이스 테이블과 매핑됨을 나타냅니다.
- `@PrimaryGeneratedColumn`: 자동 증가하는 기본 키를 정의합니다.
- `@Column`: 테이블의 컬럼을 정의합니다.
- `@CreateDateColumn`: 레코드 생성 시간을 자동으로 설정하는 컬럼을 정의합니다.
- `@OneToMany`: 다른 엔티티와의 일대다 관계를 정의합니다.
- `@Exclude`: 응답에서 특정 필드(예: 비밀번호)를 제외시킵니다.

## DTO와 Entity의 차이점

1. **용도**:
   - DTO: 클라이언트-서버 간 데이터 전송, 입력 데이터 검증
   - Entity: 데이터베이스 테이블 매핑, 데이터 영속성 관리

2. **구조**:
   - DTO: 클라이언트의 요청에 맞게 설계 (필요한 필드만 포함)
   - Entity: 데이터베이스 테이블의 구조에 맞게 설계 (모든 컬럼 포함)

3. **생명주기**:
   - DTO: 요청-응답 사이클 내에서만 존재
   - Entity: 애플리케이션과 데이터베이스 간의 지속적인 매핑으로 사용

4. **검증 로직**:
   - DTO: 입력 데이터 검증에 중점
   - Entity: 데이터베이스 제약조건 및 관계 정의에 중점

## 실제 사용 예시

### 컨트롤러에서의 DTO 사용:
```typescript
@Post()
async createUser(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

### 서비스에서의 Entity 사용:
```typescript
async create(createUserDto: CreateUserDto): Promise<User> {
  const user = new User();
  user.username = createUserDto.username;
  user.password = await this.hashPassword(createUserDto.password);
  
  return this.usersRepository.save(user);
}
```

## NestJS에서의 DTO와 Entity 활용 패턴

1. **입력 데이터 검증**: 컨트롤러에서 DTO를 사용하여 클라이언트의 요청 데이터를 검증합니다.
2. **데이터 변환**: DTO에서 Entity로 데이터를 변환하여 데이터베이스 작업을 수행합니다.
3. **응답 데이터 가공**: Entity에서 필요한 정보만 추출하여 응답 DTO를 생성하거나, 직접 Entity를 반환합니다.
4. **데이터 보안**: 민감한 정보(비밀번호 등)는 응답에서 제외하기 위해 `@Exclude` 데코레이터를 사용합니다.

## 결론

DTO와 Entity는 각각 다른 역할을 수행하지만, 함께 사용하여 클라이언트-서버-데이터베이스 간의 데이터 흐름을 효과적으로 관리할 수 있습니다. DTO는 클라이언트와의 인터페이스를 담당하고, Entity는 데이터베이스와의 인터페이스를 담당하여 각 계층 간의 관심사를 분리합니다.
