import { QueryFailedError } from 'typeorm';
import { ErrorCode } from '../constants/error-codes';
import { AppException } from '../exceptions/app.exception';

// 데이터베이스 오류를 분석하여 적절한 AppException으로 변환
export function handleDatabaseError(error: any): AppException {
  // QueryFailedError 처리
  if (error instanceof QueryFailedError) {
    const errorMessage = error.message || '';
    
    // MySQL 유니크 제약 조건 위반 오류 처리
    if (errorMessage.includes('Duplicate entry')) {
      // user_id 중복 오류
      if (errorMessage.includes('user_id') || errorMessage.includes('user.IDX_')) {
        return new AppException(ErrorCode.USER_ALREADY_EXISTS);
      };

      // team_name 중복 오류
      if (errorMessage.includes('team_name') || errorMessage.includes('team.IDX_')) {
        return new AppException(ErrorCode.TEAM_NAME_ALREADY_EXISTS);
      };
      
      // 기타 중복 오류
      return new AppException(ErrorCode.DATABASE_ERROR, {
        originalError: process.env.NODE_ENV === 'production' ? undefined : errorMessage
      });
    }
    
    // 외래 키 제약 조건 위반 오류
    if (errorMessage.includes('foreign key constraint fails')) {

      // 존재하지 않는 팀원 추가 오류
      if (errorMessage.includes("`team_member`") && errorMessage.includes("`user_id`")) {
        return new AppException(ErrorCode.TEAM_MEMBER_NOT_FOUND);
      };

      // 기타 외래 키 제약 조건 위반 오류
      return new AppException(ErrorCode.DATABASE_ERROR, {
        originalError: process.env.NODE_ENV === 'production' ? undefined : errorMessage,
        detail: '참조 무결성 제약 조건 위반이 발생했습니다.'
      });
    }
  }
  
  // 기타 데이터베이스 오류
  return new AppException(ErrorCode.DATABASE_ERROR, {
    originalError: process.env.NODE_ENV === 'production' ? undefined : error.message
  });
}
