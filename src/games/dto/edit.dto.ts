import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class EditDto {

    @IsString()
    @MaxLength(150)
    @MinLength(3)
    title : string;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    platform : string;

    @IsNotEmpty()
    @IsNumber()
    score:number;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    genre

    @IsString()
    @MaxLength(1)
    @MinLength(1)
    editors_choice
}