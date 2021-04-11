import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    @MaxLength(150)
    @MinLength(3)
    name : string;

    @IsEmail()
    email : string;

    @MaxLength(12)
    @MinLength(6)
    password:string;
}