import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/users.entity';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private users:Repository<User>,
        private readonly jwtService: JwtService
    ) {}
    async signup(signupDto: SignupDto) {
        let req_obj = signupDto;
        try{
            let usr = await this.users.findOne({email : req_obj.email})
            if(!usr) {
                this.users.save(
                    this.users.create(req_obj));
                return 'User created successfully'
            } 
            return 'User already existed with this email'
        } catch(error) {
            throw new Error("Internal server error");
            
        }
    }

    async login(loginDto: LoginDto) {
        let req_obj = loginDto;
        try {
            let usr = await this.users.findOne({email : req_obj.email})
            if(!usr) {
                return 'User not existed with given email'
            }
            if(crypto.createHmac('sha256', req_obj.password).digest('hex') === usr.password) {
                let payload = {name: usr.name, id : usr.id};
                const accessToken = this.jwtService.sign(payload);
      
                return {
                   expires_in: 3600,
                   access_token: accessToken,
                   user_id: payload,
                   status: 200
                };
      
            };
            return 'Provided email/password is wrong'
        } catch(err) {
            throw new Error("Internal server error");
            
        }

    }

}
