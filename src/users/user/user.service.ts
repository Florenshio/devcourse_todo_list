import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    /* 회원가입 */
    async register(createUserDto: CreateUserDto): Promise<User> {

        const { user_id, password } = createUserDto;

        // 비밀번호 암호화 로직 필요
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

    /* 사용자 찾기 */
    async findUserId(user_id: string): Promise<User | null> {
        return this.userRepository.findOne({
                where: { user_id: user_id }
            });
    }
    
    /* 로그인한 사용자 정보 조회 */
    // 고도화 필요
    async getUserLogined(user: object): Promise<object | null> {
        return user;
    }
}
