import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TeamsController } from './teams/teams.controller';
import { TasksController } from './tasks/tasks.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    UsersController,
    TeamsController,
    TasksController,
  ],
  providers: [AppService],
})
export class AppModule {}
