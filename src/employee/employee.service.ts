import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { employee } from './employee.entity';
import { createemployeedto } from './employeedto';
import { User } from 'src/users/user.entity';
import { customer } from 'src/customer/customer.entity';
import { UsersService } from 'src/users/users.service';
import { paginationdto } from './pagination.dto';
import { toASCII } from 'punycode';
import { last } from 'rxjs';
import { FilterOperator, FilterSuffix, paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()

export class EmployeeService {
  constructor(
            @InjectRepository(employee) private employeerepository: Repository<employee>,
            @InjectRepository(User) private Userrepository: Repository<User>,
            @InjectRepository(customer) private customerrepository:Repository<customer>,
            private readonly usersService:UsersService,
  ){}


    create(dto: any) {
       
        return dto;
    }
    
    async findall(paginationdto: paginationdto) {
      return await this.employeerepository.find({
        skip:paginationdto.skip,
        take:paginationdto.limit, 
      });
    }
   
     async createuseremployee(
            id:number,
            
            createemployeedto:createemployeedto){
            
                const user = await this.Userrepository.findOne({
                    where:{id},
                    relations:['employee','customer']  
                    
            })
            if(!user){
                throw new HttpException(
             'user not found',HttpStatus.BAD_REQUEST,
                ) }
            if(user.customer){
                throw new UnauthorizedException('customer is already assigned')
            }       
                if(user.employee){
                throw new UnauthorizedException('employee is already assigned')
                }
                const newemployee = this.employeerepository.create(createemployeedto)
                const savedemployee = await this.employeerepository.save(newemployee)
                user.employee = savedemployee;
                return this.Userrepository.save(user);
                } 

   async assigncustomertoemployee(employee_id:number, customer_id:number) {
    const employee = await this.employeerepository.findOne({ where:{employee_id:employee_id}})
    if(!employee) {
      throw new NotFoundException('employee not found');
    }
    const customer = await this.customerrepository.findOne({
      where :{customer_id:customer_id},
      relations:['employee'],
    }); 
    if(!customer){
      throw new NotFoundException('customer not found');
    }
    customer.employee = employee;
    await this.customerrepository.save(customer);
    return { message:'customer assigned successfully',customer};
   }

   async getcustomersforemployee(employeeid:number) {
    const employee =await this.employeerepository.findOne({
      where:{ employee_id:employeeid},
      relations:['customers']
    })

    if(!employee) {
      throw new NotFoundException('employee not found')
    }
    return employee.customers;
   }
  
   
  async assignusertoemployee(employee_id:number,user_id:number) {
    const employee =await this.employeerepository.findOne({
      where:{employee_id},
      relations:['user'],
    });
    if(!employee) {
      throw new NotFoundException('employee not found');
    }
    if(employee.user) {
      throw new BadRequestException('this employee is already assigned to a user')
    }
    const user = await this.usersService.checkusernotassigned(user_id)

   employee.user =user;
   await this.employeerepository.save(employee);
   return {message:'user assigned to employee ',employee}

}
  async getcustomerofemployee(employee_id:number,query:PaginateQuery) {
    const querybuilder = await this.customerrepository
    .createQueryBuilder('customer')
.where('customer.employeeEmployeeId = :employee_id', { employee_id });

    return paginate(query,querybuilder, {
      sortableColumns:['customer_id','name',],
      filterableColumns:{
        name:[FilterOperator.EQ, FilterOperator.ILIKE]
      },
      defaultSortBy:[['customer_id','ASC']],
      defaultLimit:5,
      maxLimit:10,
      
    })
  }
  
}
 
