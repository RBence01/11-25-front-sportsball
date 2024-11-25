import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private readonly db: PrismaService) {}
  create(createTeamDto: CreateTeamDto) {
    return this.db.team.create({data: createTeamDto});
  }

  findAll() {
    return this.db.team.findMany({include: {players: true}});
  }

  findOne(id: number) {
    return this.db.team.findUnique({where: {id}, include: {players: true}});
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.db.team.update({where: {id}, data: updateTeamDto});
  }

  remove(id: number) {
    return this.db.team.delete({where: {id}});
  }
}
