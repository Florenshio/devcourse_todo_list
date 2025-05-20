import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddTeamMemberDto } from './dto/add-team-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('teams')
@Controller('teams')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  @ApiOperation({ summary: '팀 생성', description: '새로운 팀 생성' })
  @ApiResponse({
    status: 201,
    description: '팀 생성 성공',
    schema: {
      example: {
        id: 1,
        name: '팀 이름',
        created_by: 1,
      },
    },
  })
  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto, @GetUser() user: any) {
    return { message: 'This action creates a new team' };
  }

  @ApiOperation({ summary: '팀 목록 조회', description: '사용자가 속한 팀 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '팀 목록 조회 성공',
    schema: {
      example: [
        {
          id: 1,
          name: '팀 이름',
          created_by: 1,
        },
      ],
    },
  })
  @Get()
  findAllTeams(@GetUser() user: any) {
    return { message: 'This action returns all teams' };
  }

  @ApiOperation({ summary: '팀 상세 조회', description: '특정 팀의 상세 정보 조회' })
  @ApiParam({ name: 'team_id', description: '팀 ID' })
  @ApiResponse({
    status: 200,
    description: '팀 상세 조회 성공',
    schema: {
      example: {
        id: 1,
        name: '팀 이름',
        created_by: 1,
        members: [
          {
            id: 1,
            username: '사용자이름',
          },
        ],
      },
    },
  })
  @Get(':team_id')
  findOneTeam(@Param('team_id') teamId: string) {
    return { message: `This action returns a team with id ${teamId}` };
  }

  @ApiOperation({ summary: '팀원 추가', description: '팀에 새로운 멤버 추가' })
  @ApiParam({ name: 'team_id', description: '팀 ID' })
  @ApiResponse({
    status: 201,
    description: '팀원 추가 성공',
    schema: {
      example: {
        id: 1,
        team_id: 1,
        user_id: 2,
      },
    },
  })
  @Post(':team_id/members')
  addTeamMember(
    @Param('team_id') teamId: string,
    @Body() addTeamMemberDto: AddTeamMemberDto,
  ) {
    return { message: `This action adds a member to team ${teamId}` };
  }

  @ApiOperation({ summary: '팀원 삭제', description: '팀에서 멤버 제거' })
  @ApiParam({ name: 'team_id', description: '팀 ID' })
  @ApiParam({ name: 'user_id', description: '사용자 ID' })
  @ApiResponse({
    status: 204,
    description: '팀원 삭제 성공',
  })
  @Delete(':team_id/members/:user_id')
  removeTeamMember(
    @Param('team_id') teamId: string,
    @Param('user_id') userId: string,
  ) {
    return { message: `This action removes a member from team ${teamId}` };
  }
}
