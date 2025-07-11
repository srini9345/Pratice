import { Body, Controller, Param, ParseIntPipe, Post ,Get, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { Paginate ,PaginateQuery } from 'nestjs-paginate';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    createuser(@Body() body: {username:string,password:string;}) {
        return this.usersService.createuser(body.username, body.password );
    }
    
  
    @Get()
    async getUsers(@Paginate() query:PaginateQuery) {
      return this.usersService.getpaginateduser(query);
    }
  
   
    }
