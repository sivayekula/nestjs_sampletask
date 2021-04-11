import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { EditDto } from './dto/edit.dto';
import { Game } from './entities/games.entity';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game) private game: Repository<Game>,
      ) {}

      async getGames(): Promise<Game[]> {
        return await this.game.find({order: {score:'ASC'}});

      }
    
      findOne(id: string): Promise<Game> {
        return this.game.findOne(id);
      }

      search(key: string): Promise<Game[]> {
        return this.game.find({title:Like(`%${key}%`)});
      }
    
      async createGame(obj: CreateDto){
          // console.log(obj)
        try{
            let game_obj = obj
            await this.game.save(game_obj);
            return {message:"New game added successfully."}
        }catch(e){ 
            return  {message:e.message}
        }
          
      }
    
      async remove(id: string): Promise<any> {
        try{
          await this.game.delete(id);
          return {message:"Game deleted successfully."}
        }catch(e){
          return e.message
        }
      }
    
      async editGame(id: number,note): Promise<Game> {
        try{
          const gme = await this.game.findOne(id);
          if (!gme) {
            throw new NotFoundException('Game is not found');
          }
          gme.title = note.title;
          gme.platform = note.platform;
          gme.score = note.score;
          gme.genre = note.genre;
          gme.editors_choice = note.editors_choice;
    
          await gme.save();
          return gme;
        } catch(err){
          return err.message
        }
      }
}
