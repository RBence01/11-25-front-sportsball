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

  teamsWithPlayers() {
    return this.db.team.findMany({where: {players: {some: {}}}, include: {players: true}});
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    try {
      return await this.db.team.update({where: {id}, data: updateTeamDto});
    } catch {
      return undefined;
    }
  }

  async remove(id: number) {
    try {
      return await this.db.team.delete({where: {id}});
    } catch {
      return undefined;
    }
  }

  async addPlayer(id: number, playerId: number) {
    try {
      return await this.db.team.update({where: {id}, data: {players: {connect: {id: playerId}}}, include: {players: true}});
    } catch {
      return undefined;
    }
  }

  async removePlayer(id: number, playerId: number) {
    try {
      return await this.db.team.update({where: {id}, data: {players: {disconnect: {id: playerId}}}, include: {players: true}});
    } catch {
      return undefined;
    }
  }
}
