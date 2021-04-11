import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    email : string;

    @MinLength(6)
    @MaxLength(12)
    password:string;
}