import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { createcustomerdto } from './customer.dto';
import { customer } from './customer.entity';
import { employee } from 'src/employee/employee.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class CustomerService {
    
    constructor(
   @InjectRepository(User) private Userrepository:
          Repository<User>,
    @InjectRepository(customer) private customerrepository:
          Repository<customer>,    
     @InjectRepository(employee) private employeerepository: Repository<employee> ) 
         {}

   
  async createcustomer(customer:createcustomerdto){
    const customerdata = await this.Userrepository.findOne({
        where:{ id:customer.customer_id}}
    );
    if(!customerdata) {
     throw new NotFoundException('usernotfound')
    }
    const newcustomer = await this.customerrepository.create(customer)
    return this.customerrepository.save(newcustomer);

}  


     async createusercustomer(
                id:number,
                createusercustomerdto:createcustomerdto){
                    const user = await this.Userrepository.findOne({
                        where:{id}, 
                        relations:['employee','customer']
        })
    
                    if(!user)
                        throw new HttpException(
                    'usernot found',HttpStatus.BAD_REQUEST,);
                                console.log('usercustomer',user.customer)
    
                    if(user.employee)
                      throw new BadRequestException('employee is already assigned')
                    if(user.customer)
                        throw new UnauthorizedException('customer is already assigned'
                    )
                    const newcustomer = this.customerrepository.create(createusercustomerdto)
                    console.log('77',newcustomer)
                    const savedcustomer = await this.customerrepository.save(newcustomer)
                        user.customer = savedcustomer;
                    return this.Userrepository.save(user)
    
                }
    

    async assignemployeetocustomer(customer_id:number,employee_id:number,note:string) {
        const customer = await this.customerrepository.findOne({ where:{customer_id:customer_id},
         relations:['employee'],
        })
        if(!customer) {
            throw new NotFoundException('customer not found');
        }
        if(customer.employee)
        {
            throw new BadRequestException('this customer is already assigned to an employee')
        }
        const employee = await this.employeerepository.findOne({ where:{employee_id:employee_id}})
        if(!employee) {
            throw new NotFoundException('employee not found')
        }

        customer.employee = employee;
        customer.note = note;

        await this.customerrepository.save(customer);

        return {message:'employee assigned to customer ',customer};

    }
    async assignusertocustomer(customer_id:number,user_id:number){
        const customer = await this.customerrepository.findOne({
            where:{ customer_id:customer_id},
            relations:['user'],
        });

        if(!customer) {
            throw new NotFoundException('customer not found');
        }
        if(customer.user) {
            throw new BadRequestException('this customer is already assigned to a user')
        }
        const user = await this.Userrepository.findOne({ where:{id:user_id},
         });
        if(!user) {
            throw new NotFoundException('user not found')
        }
        customer.user = user;
        await this.customerrepository.save(customer);
        return { message:'user assigned to customer successfully',customer};
    }

    async getemployeeofcustomer(customer_id:number) {
        const customer = await this.customerrepository.findOne({
            where: { customer_id:customer_id},
            relations:['employee'],
        });
        if(!customer) {
            throw new NotFoundException('customer not found ');
        }
        if(!customer.employee) {
            return { message:'no employee assigned to this customer yet '}
        }
        console.log(customer.employee)
        return customer.employee;
        
    }
    async getpaginatedcustomer(query:PaginateQuery) {
        const querybuilder =this.customerrepository.createQueryBuilder('customer');
        return paginate(query,querybuilder,{
            sortableColumns:['customer_id','name','email','phoneno']
            ,defaultSortBy:[['customer_id','ASC']],
            maxLimit:10,
            defaultLimit:5,
        })
    }         
}
