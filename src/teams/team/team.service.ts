import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from '../dto/create-team.dto';
import { JwtPayload } from 'src/common/interface/jwt-payload.interface';
import { TeamMember } from '../entities/team-member.entity';
import { AddTeamMemberDto } from '../dto/add-team-member.dto';

@Injectable()
export class TeamService {

    constructor (
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,

        @InjectRepository(TeamMember)
        private teamMemberRepository: Repository<TeamMember>
    ) {};

    async createTeam(createTeamDto: CreateTeamDto, user: JwtPayload) {
        const { name } = createTeamDto;

        const teamData: Partial<Team> = {
            name,
            created_by: user.id
        };

        const newTeam = await this.teamRepository.create(teamData);
        const createResult = await this.teamRepository.save(newTeam)
        
        //
        const teamMemberData: Partial<TeamMember> = {
            team_id: newTeam.id,
            user_id: user.id
        };

        const newTeamMember = this.teamMemberRepository.create(teamMemberData);
        await this.teamMemberRepository.save(newTeamMember);

        return createResult;
    }

    async findAllTeams(user: JwtPayload) {
        // 1. 사용자가 생성한 팀 찾기
        const createdTeams = await this.teamRepository.find({ 
            where: { created_by: user.id },
            relations: ['members'] // 'members.user'
        });
        
        // 2. 사용자가 멤버로 속한 팀 찾기
        const teamMembers = await this.teamMemberRepository.find({
            where: { user_id: user.id },
            relations: ['team', 'team.members']
        });
        
        // 3. 멤버로 속한 팀들 추출
        const memberTeams = teamMembers.map(member => member.team);
        
        // 4. 중복 제거 (사용자가 생성했으면서 멤버로도 등록된 경우)
        const allTeams = [...createdTeams];
        
        for (const team of memberTeams) {
            // 이미 결과에 포함된 팀인지 확인
            const isDuplicate = allTeams.some(t => t.id === team.id);
            if (!isDuplicate) {
                allTeams.push(team);
            }
        }
        
        return allTeams;
    }

    async findTeamById(team_id: number, user: JwtPayload) {
        // 자신이 속한 팀이 아니면 조회 못하도록
        const team = await this.teamRepository.find({ 
            where: { id: team_id },
            relations: ['members']
         });

        // if (!team) {
        //     throw new Error('팀 ID가 존재하지 않습니다.');
        // }

        const teamMembers = team.map(t => t.members.map(m => m.user_id));

        if (!teamMembers[0].includes(user.id)) {
            throw new Error('팀에 속해있지 않습니다.');
        }

        return this.teamRepository.findOneBy({ id: team_id });
    }

    async removeTeam(team_id: number, user: JwtPayload) {
        const team = await this.teamRepository.find(
            { where: { id: team_id, created_by: user.id } });

        if (!team) {
            throw new Error('팀 ID가 존재하지 않습니다.');
        }

        return this.teamRepository.remove(team);
    }

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

        // 팀원 추가 실행
        const { user_id } = addTeamMemberDto;

        const teamMemberData: Partial<TeamMember> = {
            team_id,
            user_id
        };

        const newTeamMember = await this.teamMemberRepository.create(teamMemberData);

        return await this.teamMemberRepository.save(newTeamMember);
    }

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

        // 팀원 삭제 실행
        return await this.teamMemberRepository.delete({ team_id: team_id, user_id: user_id });
    }
}
