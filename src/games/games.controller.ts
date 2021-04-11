import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto/create.dto';
import { EditDto } from './dto/edit.dto';
import { Game } from './entities/games.entity';
import { GamesService } from './games.service';
import { Request } from 'express';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

@Controller('games')
export class GamesController {
    constructor(private gameService: GamesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':filter?/:sort?')
  findAll() {
    return this.gameService.getGames();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.gameService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/search/:key')
  search(@Param('key') key) {
    return this.gameService.search(key);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post() 
  create(@Body() body: CreateDto, @Req() request: Request,): any {
    body['user_id'] = request.user
    return this.gameService.createGame(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async editNote(@Body() body: EditDto, @Param('id') id: number): Promise<Game> {
    const noteEdited = await this.gameService.editGame(id, body);
    return noteEdited;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id): any {
    let res = this.gameService.remove(id);
    return res
  }
}
