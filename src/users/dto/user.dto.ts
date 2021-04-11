import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";

export class UserDto {  
    @IsEmpty()  id: number;
    @IsNotEmpty()  name: string;
    @IsNotEmpty()  @IsEmail()  email: string;
}
