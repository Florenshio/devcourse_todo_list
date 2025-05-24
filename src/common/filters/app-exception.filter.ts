import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { AppException } from '../exceptions/app.exception';
import { handleDatabaseError } from '../error-handlers/database-error-handler';

@Catch(HttpException, QueryFailedError, Error)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | QueryFailedError | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    // 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV !== 'production') {
      console.log('Exception caught:', exception);
    }
    
    // 데이터베이스 오류 처리 (QueryFailedError)
    if (exception instanceof QueryFailedError) {
      const appException = handleDatabaseError(exception);
      const exceptionResponse = appException.getResponse() as any;
      
      return response.status(appException.getStatus()).json({
        success: false,
        ...exceptionResponse,
        timestamp: new Date().toISOString(),
        path: request.url
      });
    }
    
    // 일반 Error 처리 (예상치 못한 오류)
    if (!(exception instanceof HttpException)) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
        detail: process.env.NODE_ENV === 'production' ? undefined : exception.message
      });
    }

    // HttpException 처리 (AppException 포함)
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;
    
    // 응답 형식 구성
    const errorResponse: any = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    };
    
    // 메시지 처리
    if (typeof exceptionResponse === 'string') {
      errorResponse.message = exceptionResponse;
    } else {
      // 오류 코드가 있는 경우 (AppException)
      if (exceptionResponse.errorCode) {
        errorResponse.errorCode = exceptionResponse.errorCode;
      }
      
      // 메시지 추가
      errorResponse.message = exceptionResponse.message || '오류가 발생했습니다.';
      
      // 상세 정보가 있는 경우 추가
      if (exceptionResponse.detail) {
        errorResponse.detail = exceptionResponse.detail;
      }
      
      // 유효성 검사 오류가 있는 경우 추가
      if (exceptionResponse.errors) {
        errorResponse.errors = exceptionResponse.errors;
      }
    }
    
    response.status(status).json(errorResponse);
  }
}
