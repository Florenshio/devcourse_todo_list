import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entities/task.entity';
import { JwtPayload } from '../../common/interface/jwt-payload.interface';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {

    constructor (
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {}

    createTask(createTaskDto: CreateTaskDto, user: JwtPayload) {
        const { title, team_id } = createTaskDto;

        const taskData: Partial<Task> = {
            title,
            status: TaskStatus.TODO,
            created_by: user.id
        };

        if (team_id !== undefined && team_id !== null) {
            taskData.team_id = team_id;
        };

        const newTask = this.taskRepository.create(taskData);

        return this.taskRepository.save(newTask);
    }

    findAllTasks(user: JwtPayload, team_id?: number, status?: TaskStatus) {
        const queryBuilder = this.taskRepository.createQueryBuilder('task');

        queryBuilder.where('task.created_by = :user_id', { user_id: user.id });

        if (team_id) {
            queryBuilder.andWhere('task.team_id = :team_id', { team_id });
        }

        if (status) {
            queryBuilder.andWhere('task.status = :status', { status });
        }

        return queryBuilder.getMany();
    }

    async updateTaskStatus(user: JwtPayload, task_id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
        const { status } = updateTaskStatusDto;

        const task = await this.taskRepository.findOneBy({ id: task_id, created_by: user.id });

        if (!task) {
            throw new Error('할 일 ID가 존재하지 않습니다.');
        }

        task.status = status;

        return this.taskRepository.save(task);
    }

    async updateTask(user: JwtPayload, task_id: number, updateTaskDto: UpdateTaskDto) {
        const { title } = updateTaskDto;

        const task = await this.taskRepository.findOneBy({ id: task_id, created_by: user.id });

        if (!task) {
            throw new Error('할 일 ID가 존재하지 않습니다.');
        }

        task.title = title;

        return this.taskRepository.save(task);
    }

    async removeTask(user: JwtPayload, task_id: number) {
        const task = await this.taskRepository.findOneBy({ id: task_id, created_by: user.id });

        if (!task) {
            throw new Error('할 일 ID가 존재하지 않습니다.');
        }

        this.taskRepository.remove(task);
        return;
    }
}
