import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }
  
  @Post(':id/addPlayer/:playerid')
  async addPlayer(@Param('id') id: string, @Param('playerid') playerId: string) {
    const response = await this.teamsService.addPlayer(+id, +playerId);
    if (!response) throw new NotFoundException();
    return response;
  }

  @HttpCode(201)
  @Delete(':id/removePlayer/:playerid')
  async removePlayer(@Param('id') id: string, @Param('playerid') playerId: string) {
    const response = await this.teamsService.removePlayer(+id, +playerId);
    if (!response) throw new NotFoundException();
  }

  @Get("players")
  teamsWithPlayers() {
    return this.teamsService.teamsWithPlayers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    const response = await this.teamsService.update(+id, updateTeamDto);
    if (!response) throw new NotFoundException();
    return response;
  }

  @HttpCode(201)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.teamsService.remove(+id);
    if (!response) throw new NotFoundException();
  }
}
