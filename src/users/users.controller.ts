import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService    ) {}

    @Post('/signup')
    signup(@Body() body: SignupDto):any {
        return this.usersService.signup(body)
    }

    @Post('/login')
    login(@Body() body: LoginDto):any {
        return this.usersService.login(body)
    }
}
