import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entities/task.entity';
import { JwtPayload } from '../../common/interface/jwt-payload.interface';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TeamMember } from '../../teams/entities/team-member.entity';

@Injectable()
export class TaskService {

    constructor (
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

        @InjectRepository(TeamMember)
        private teamMemberRepository: Repository<TeamMember>
    ) {}

    /* 할 일 생성 */
    async createTask(createTaskDto: CreateTaskDto, user: JwtPayload) {
        const { title, team_id } = createTaskDto;

        const taskData: Partial<Task> = {
            title,
            status: TaskStatus.TODO,
            created_by: user.id
        };

        // 팀 ID가 있으면 할 일에 팀 ID 추가
        if (team_id !== undefined && team_id !== null) {
            
            // 해당 팀에 사용자가 속해있는지 확인
            const is_teamMember = await this.teamMemberRepository.findOne({ where: { team_id: team_id, user_id: user.id } });
            if (!is_teamMember) {
                throw new Error('소속된 팀이 아닙니다.');
            }
            
            taskData.team_id = team_id;
        };

        const newTask = await this.taskRepository.create(taskData);
        return await this.taskRepository.save(newTask);
    }

    /* 할 일 목록 조회 */
    async findAllTasks(user: JwtPayload, team_id?: number, status?: TaskStatus) {
        const queryBuilder = await this.taskRepository.createQueryBuilder('task');

        queryBuilder.where('task.created_by = :user_id', { user_id: user.id });

        if (team_id) {
            queryBuilder.andWhere('task.team_id = :team_id', { team_id });
        } else {
            queryBuilder.andWhere('task.team_id IS NULL');
        }

        if (status) {
            queryBuilder.andWhere('task.status = :status', { status });
        }

        return await queryBuilder.getMany();
    }

    /* 할 일 상태 변경 */
    async updateTaskStatus(user: JwtPayload, task_id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
        const { status } = updateTaskStatusDto;

        const task = await this.taskRepository.findOneBy({ id: task_id, created_by: user.id });
        if (!task) {
            throw new Error('할 일 ID가 존재하지 않습니다.');
        }

        task.status = status;

        return await this.taskRepository.save(task);
    }

    /* 할 일 수정 */
    async updateTask(user: JwtPayload, task_id: number, updateTaskDto: UpdateTaskDto) {
        const { title } = updateTaskDto;

        const task = await this.taskRepository.findOneBy({ id: task_id, created_by: user.id });
        if (!task) {
            throw new Error('할 일 ID가 존재하지 않습니다.');
        }

        task.title = title;

        return await this.taskRepository.save(task);
    }

    /* 할 일 삭제 */
    async removeTask(user: JwtPayload, task_id: number) {
        const task = await this.taskRepository.findOneBy({ id: task_id, created_by: user.id });
        if (!task) {
            throw new Error('할 일 ID가 존재하지 않습니다.');
        }

        await this.taskRepository.remove(task);
        return;
    }
}
