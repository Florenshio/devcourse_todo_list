import { ArgumentMetadata, Injectable, PipeTransform, ValidationPipe } from '@nestjs/common';
import { ErrorCode } from '../constants/error-codes';
import { AppException } from '../exceptions/app.exception';

@Injectable()
export class CustomValidationPipe extends ValidationPipe implements PipeTransform {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => {
          const constraints = error.constraints ? Object.values(error.constraints) : [];
          return {
            field: error.property,
            messages: constraints,
          };
        });

        // 비밀번호 일치 오류 처리
        const passwordMatchError = formattedErrors.find(e => 
          e.field === 'repassword' && 
          e.messages.some(msg => msg.includes('비밀번호가 일치하지 않습니다'))
        );
        
        if (passwordMatchError) {
          return new AppException(ErrorCode.REPASSWORD_MISMATCH, formattedErrors);
        }

        // 기타 유효성 검사 오류
        return new AppException(ErrorCode.VALIDATION_ERROR, formattedErrors);
      },
    });
  }
}
