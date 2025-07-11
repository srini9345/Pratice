import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, Query, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { User } from './user.entity';
import { employee } from 'src/employee/employee.entity';
import { paginate ,PaginateQuery } from 'nestjs-paginate';
import { customer } from 'src/customer/customer.entity';
import { last } from 'rxjs';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private Userrepository:
        Repository<User>,
        @InjectRepository(employee) private employeerepository: Repository<employee>,
        @InjectRepository(customer) private customerrepository: Repository<customer>
        
    ){}
   
    findusers() {}

     createuser(username:string,password:string)
    {
        const user= this.Userrepository.create({username,password})
        return this.Userrepository.save(user);
    }

    findall() {
        return this.Userrepository.find();
    }

    async getusers(page:number = 1, limit:number = 5) {
        const [result, total ] = await this.Userrepository.findAndCount({
            skip:(page-1) * limit,
            take:limit,
        });

        return {
            data:result,
            total,
            page,
            last_page:Math.ceil(total / limit)
        };
    }
    async checkusernotassigned(user_id:number) {
        const user = await this.Userrepository.findOne({
            where:{ id:user_id},
            relations:['employee','customer']
        })
       if(!user) throw new NotFoundException('user not found');
       
       if(user.employee) {
        throw new BadRequestException('this user already assigned to employee')
       }
       if(user.customer) {
        throw new BadRequestException('this user is already assigned to customer')
       }
       return user;
    } 
    async getpaginateduser(query:PaginateQuery){
  const querybuilder = this.Userrepository.createQueryBuilder('user');
  return paginate(query,querybuilder,{
      sortableColumns:['id','username','password'],
      defaultSortBy:[['id','ASC']],
      maxLimit: 10,
      defaultLimit: 5,
  });
}   
}

    

        
        

    

   

