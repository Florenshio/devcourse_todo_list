import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from '../dto/create-team.dto';
import { JwtPayload } from '../../common/interface/jwt-payload.interface';
import { TeamMember } from '../entities/team-member.entity';
import { AddTeamMemberDto } from '../dto/add-team-member.dto';
import { AppException } from '../../common/exceptions/app.exception';
import { ErrorCode } from '../../common/constants/error-codes';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Injectable()
export class TeamService {

    constructor (
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,

        @InjectRepository(TeamMember)
        private teamMemberRepository: Repository<TeamMember>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {};

    /* 팀 생성 */
    async createTeam(createTeamDto: CreateTeamDto, user: JwtPayload) {
        const { name } = createTeamDto;

        const teamData: Partial<Team> = {
            name,
            created_by: user.id
        };

        const newTeam = await this.teamRepository.create(teamData);
        const createResult = await this.teamRepository.save(newTeam)
        
        // 팀 생성 시 사용자도 팀에 추가
        const teamMemberData: Partial<TeamMember> = {
            team_id: newTeam.id,
            user_id: user.id
        };

        const newTeamMember = await this.teamMemberRepository.create(teamMemberData);
        await this.teamMemberRepository.save(newTeamMember);

        return createResult;
    }

    /* 팀 목록 조회 */
    async findAllTeams(user: JwtPayload) {
        // 사용자가 멤버로 속한 모든 팀 찾기 (생성한 팀도 포함)
        const teamMembers = await this.teamMemberRepository.find({
            where: { user_id: user.id },
            relations: ['team', 'team.members']
        });
        
        // 멤버로 속한 팀들 추출
        const teams = teamMembers.map(member => member.team);
        
        return teams;
    }

    /* 팀 ID로 조회 */
    async findTeamById(team_id: number, user: JwtPayload) {
        // 자신이 속한 팀이 아니면 조회 못하도록
        const team = await this.teamRepository.find({ 
            where: { id: team_id },
            relations: ['members']
         });

        const teamMembers = team.map(t => t.members.map(m => m.user_id));

        if (!teamMembers[0].includes(user.id)) {
            throw new Error('팀에 속해있지 않습니다.');
        }

        return await this.teamRepository.findOneBy({ id: team_id });
    }

    /* 팀 삭제 */
    async removeTeam(team_id: number, user: JwtPayload) {
        const team = await this.teamRepository.find({
            where: { id: team_id},
            relations: ['members']
        });

        const teamMembers = team.map(t => t.members.map(m => m.user_id));

        if (!teamMembers[0].includes(user.id)) {
            throw new Error('소속된 팀이 아닙니다.');
        }

        if (!team) {
            throw new Error('팀 ID가 존재하지 않습니다.');
        }

        // 팀 멤버를 먼저 삭제
        await this.teamMemberRepository.delete({ team_id });

        // 해당 팀의 할 일을 삭제
        await this.taskRepository.delete({ team_id });

        return await this.teamRepository.remove(team);
    }

    /* 팀원 추가 */
    async addTeamMember(team_id: number, addTeamMemberDto: AddTeamMemberDto, user: JwtPayload) {

        // 사용자가 속한 팀인지 확인
        const team = await this.teamRepository.find({
            where: { id: team_id },
            relations: ['members']
        });
        const teamMembers = team.map(t => t.members.map(m => m.user_id));

        if (!teamMembers[0].includes(user.id)) {
            throw new Error('소속된 팀이 아닙니다.');
        }

        // 팀원 추가 실행, 중복 확인
        const { user_id } = addTeamMemberDto;
        const user_id_number = await this.userRepository.findOneBy({ user_id: user_id });

        if (!user_id_number) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        const teamMember = await this.teamMemberRepository.findOneBy({ team_id, user_id: user_id_number.id });
        if (teamMember) {
            throw new AppException(ErrorCode.TEAM_MEMBER_ALREADY_EXISTS);
        }

        const teamMemberData: Partial<TeamMember> = {
            team_id,
            user_id: user_id_number.id
        };

        const newTeamMember = await this.teamMemberRepository.create(teamMemberData);

        return await this.teamMemberRepository.save(newTeamMember);
    }

    /* 팀원 조회 */
    async getTeamMembers(team_id: number, user: JwtPayload) {
        // 사용자가 속한 팀인지 확인
        const team = await this.teamRepository.find({
            where: { id: team_id },
            relations: ['members']
        });
        const teamMembers = team.map(t => t.members.map(m => m.user_id));

        if (!teamMembers[0].includes(user.id)) {
            throw new Error('소속된 팀이 아닙니다.');
        }

        const members = await this.teamMemberRepository.find({
            where: { team_id },
            relations: ['user']
        });

        // user 비밀번호와 생성 시기 정보는 제외해서 응답하도록
        return members.map(member => ({
            id: member.id,
            team_id: member.team_id,
            user_id: member.user_id,
            user: member.user ? {
                id: member.user.id,
                username: member.user.user_id
            } : null
        }));
    }

    /* 팀원 삭제 */
    async removeTeamMember(team_id: number, user_id: number, user: JwtPayload) {
        // 사용자가 속한 팀인지 확인
        const team = await this.teamRepository.find({
            where: { id: team_id },
            relations: ['members']
        });
        const teamMembers = team.map(t => t.members.map(m => m.user_id));

        if (!teamMembers[0].includes(user.id)) {
            throw new Error('소속된 팀이 아닙니다.');
        }

        return await this.teamMemberRepository.delete({ team_id: team_id, user_id: user_id });
    }
}
