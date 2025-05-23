import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsController } from './teams/teams.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // .env 파일 로드
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // 개발 환경에서만 true로 설정
    }),
    UsersModule,
    TasksModule,
    TeamsModule,
    AuthModule],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}
