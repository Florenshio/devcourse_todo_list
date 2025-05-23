import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team-member.entity';
import { TeamService } from './team/team.service';
import { AuthModule } from '../auth/auth.module';
import { TeamsController } from './teams.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, TeamMember]),
        AuthModule
    ],
    controllers: [TeamsController],
    providers: [TeamService],
    exports: [TeamService],
})
export class TeamsModule {}
