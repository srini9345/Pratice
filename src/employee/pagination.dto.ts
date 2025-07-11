import { IsNumber, IsOptional, IsPositive } from "class-validator";

 export class paginationdto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    skip:number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit:number;

 }