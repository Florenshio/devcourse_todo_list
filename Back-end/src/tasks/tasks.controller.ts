import { HttpCode, Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { TaskService } from './task/task.service';
import { JwtPayload } from 'Back-end/src/common/interface/jwt-payload.interface';
import { TaskStatus } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class TasksController {

  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: '할 일 생성', description: '새로운 할 일 생성' })
  @ApiResponse({
    status: 201,
    description: '할 일 생성 성공',
    schema: {
      example: {
        id: 1,
        title: '할 일 제목',
        status: 'todo',
        created_by: 1,
        team_id: 1,
      },
    },
  })
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: JwtPayload) {
    return this.taskService.createTask(createTaskDto, user);
  }

  @ApiOperation({ summary: '할 일 목록 조회', description: '사용자의 할 일 목록 조회' })
  @ApiQuery({ name: 'team_id', description: '팀 ID', required: false })
  @ApiQuery({ name: 'status', description: '상태 필터 (todo, done, all)', required: false })
  @ApiResponse({
    status: 200,
    description: '할 일 목록 조회 성공',
    schema: {
      example: [
        {
          id: 1,
          title: '할 일 제목',
          status: 'todo',
          created_by: 1,
          team_id: 1,
        },
      ],
    },
  })
  @Get()
  findAllTasks(
    @GetUser() user: JwtPayload,
    @Query('team_id') team_id?: number,
    @Query('status') status?: TaskStatus
  ) {
    return this.taskService.findAllTasks(user, team_id, status);
  }

  @ApiOperation({ summary: '할 일 상태 변경', description: '할 일의 상태 변경 (todo <-> done)' })
  @ApiParam({ name: 'task_id', description: '할 일 ID' })
  @ApiResponse({
    status: 200,
    description: '할 일 상태 변경 성공',
    schema: {
      example: {
        id: 1,
        title: '할 일 제목',
        status: 'done',
        created_by: 1,
        team_id: 1,
      },
    },
  })
  @Patch(':task_id/status')
  updateTaskStatus(
    @GetUser() user: JwtPayload,
    @Param('task_id') task_id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateTaskStatus(user, task_id, updateTaskStatusDto);
  }

  @ApiOperation({ summary: '할 일 수정', description: '할 일 내용 수정' })
  @ApiParam({ name: 'task_id', description: '할 일 ID' })
  @ApiResponse({
    status: 200,
    description: '할 일 수정 성공',
    schema: {
      example: {
        id: 1,
        title: '수정된 할 일 제목',
        status: 'todo',
        created_by: 1,
        team_id: 1,
      },
    },
  })
  @Put(':task_id')
  updateTask(
    @GetUser() user: JwtPayload,
    @Param('task_id') task_id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(user, task_id, updateTaskDto);
  }

  @ApiOperation({ summary: '할 일 삭제', description: '할 일 삭제' })
  @ApiParam({ name: 'task_id', description: '할 일 ID' })
  @ApiResponse({
    status: 204,
    description: '할 일 삭제 성공',
  })
  @HttpCode(204)
  @Delete(':task_id')
  async removeTask(
    @Param('task_id') task_id: number,
    @GetUser() user: JwtPayload
  ) {
    await this.taskService.removeTask(user, task_id);
    return;
  }

  // @ApiOperation({ summary: '할 일 액션 로그 조회', description: '특정 할 일에 대한 액션 기록 조회' })
  // @ApiParam({ name: 'task_id', description: '할 일 ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: '할 일 액션 로그 조회 성공',
  //   schema: {
  //     example: [
  //       {
  //         id: 1,
  //         task_id: 1,
  //         action_type: 'edit',
  //         performed_by: 1,
  //         performed_at: '2025-05-13T11:15:15+09:00',
  //         user: {
  //           username: '사용자이름',
  //         },
  //       },
  //     ],
  //   },
  // })
  // @Get(':task_id/actions')
  // findTaskActions(@Param('task_id') taskId: string) {
  //   return { message: `This action returns actions for task ${taskId}` };
  // }
}
