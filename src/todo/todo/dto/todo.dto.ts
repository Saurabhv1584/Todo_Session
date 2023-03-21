import { IsString, IsBoolean, IsNumber } from "class-validator";

export class CreateTodo {
    // @IsNumber()
    // id:number;

    @IsString()
    title:string;

    @IsString()
    content: string;

    @IsBoolean()
    isCompleted: boolean;

}