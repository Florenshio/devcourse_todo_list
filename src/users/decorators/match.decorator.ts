import { 
  registerDecorator, 
  ValidationOptions, 
  ValidationArguments, 
  ValidatorConstraint, 
  ValidatorConstraintInterface 
} from 'class-validator';

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName}와(과) 일치하지 않습니다.`;
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: MatchConstraint,
    });
  };
}

/* ValidationArguments 인터페이스는 다음과 같은 속성을 포함 */
// constraints: 데코레이터에 전달된 제약 조건 배열 (예: ['password'])
// object: 검증 중인 객체 (예: CreateUserDto 인스턴스)
// property: 현재 검증 중인 속성 이름 (예: 'repassword')
// targetName: 대상 클래스 이름
// value: 검증 중인 값 (첫 번째 매개변수와 동일)