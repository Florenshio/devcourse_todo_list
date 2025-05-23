/**
 * 애플리케이션 전체에서 사용할 오류 코드 및 메시지 정의
 */
export enum ErrorCode {
  // 사용자 관련 오류 (u-xxx)
  REPASSWORD_MISMATCH= 'u-001', // 비밀번호 확인이 일치하지 않음
  USER_ALREADY_EXISTS = 'u-002', // 이미 존재하는 아이디
  
  // 인증 관련 오류 (a-xxx)
  USER_NOT_FOUND = 'a-001', // 존재하지 않는 아이디
  INVALID_PASSWORD = 'a-002', // 비밀번호 불일치
  TOKEN_EXPIRED = 'a-003', // 토큰 만료 

  // 팀 관리 관련 오류 (te-xxx)
  TEAM_NAME_ALREADY_EXISTS = 'te-001', // 팀 생성시, 팀 이름이 이미 존재하는 경우
  TEAM_MEMBER_ALREADY_EXISTS = 'te-002', // 이미 초대한 팀원을 또 초대하는 경우
  TEAM_MEMBER_NOT_FOUND = 'te-003', // 존재하지 않는 유저를 팀으로 초대하려고 할 때
  
  // 일반 오류 (g-xxx)
  VALIDATION_ERROR = 'g-001',
  DATABASE_ERROR = 'g-002',
  INTERNAL_SERVER_ERROR = 'g-003',
}

/**
 * 오류 코드에 대한 상세 정보 정의
 */
export interface ErrorDetails {
  statusCode: number;
  message: string;
  detail?: string;
}

/**
 * 오류 코드별 상세 정보 매핑
 */
export const ERROR_DETAILS: Record<ErrorCode, ErrorDetails> = {
  // 사용자 관련 오류
  [ErrorCode.USER_ALREADY_EXISTS]: {
    statusCode: 409,
    message: '이미 존재하는 사용자 ID입니다.',
    detail: '다른 사용자 ID를 사용해주세요.'
  },
  [ErrorCode.USER_NOT_FOUND]: {
    statusCode: 404,
    message: '사용자를 찾을 수 없습니다.',
    detail: '존재하지 않는 사용자입니다.'
  },
  [ErrorCode.INVALID_PASSWORD]: {
    statusCode: 400,
    message: '비밀번호가 일치하지 않습니다.',
    detail: '비밀번호가 일치하지 않습니다.'
  },
  [ErrorCode.REPASSWORD_MISMATCH]: {
    statusCode: 400,
    message: '비밀번호가 일치하지 않습니다.',
    detail: '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
  },
  
  // 인증 관련 오류
  [ErrorCode.TOKEN_EXPIRED]: {
    statusCode: 401,
    message: '만료된 토큰입니다.',
    detail: '다시 로그인해주세요.'
  },
  
  // 팀 관련 오류
  [ErrorCode.TEAM_NAME_ALREADY_EXISTS]: {
    statusCode: 409,
    message: '이미 존재하는 팀 이름입니다.',
    detail: '다른 팀 이름을 사용해주세요.'
  },
  [ErrorCode.TEAM_MEMBER_ALREADY_EXISTS]: {
    statusCode: 409,
    message: '이미 초대된 팀원입니다.',
    detail: '이미 팀에 초대된 사용자입니다.'
  },
  [ErrorCode.TEAM_MEMBER_NOT_FOUND]: {
    statusCode: 404,
    message: '존재하지 않는 사용자입니다.',
    detail: '초대하려는 사용자를 찾을 수 없습니다.'
  },
  
  // 일반 오류
  [ErrorCode.VALIDATION_ERROR]: {
    statusCode: 400,
    message: '입력 데이터가 유효하지 않습니다.',
  },
  [ErrorCode.DATABASE_ERROR]: {
    statusCode: 500,
    message: '데이터베이스 오류가 발생했습니다.',
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    statusCode: 500,
    message: '서버 내부 오류가 발생했습니다.',
  },
};
