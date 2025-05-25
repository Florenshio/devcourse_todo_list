import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team-member.entity';
import { TeamService } from './team/team.service';
import { AuthModule } from '../auth/auth.module';
import { TeamsController } from './teams.controller';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, TeamMember, User, Task]),
        AuthModule
    ],
    controllers: [TeamsController],
    providers: [TeamService],
    exports: [TeamService],
})
export class TeamsModule {}
