import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TaskService } from './task/task.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule
    ],
    controllers: [TasksController],
    providers: [TaskService],
    exports: [TaskService]
})
export class TasksModule {}
