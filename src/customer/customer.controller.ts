import { Body, Controller, Param, ParseIntPipe, Post ,Get, Query} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { createusercustomerdto } from 'src/createusercustomer';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('customer')
export class CustomerController {
 constructor(private readonly customerService: CustomerService) {}

 @Post(':id/customer')
 createusercustomer(
    @Param('id',ParseIntPipe) id:number,
    @Body() dto:createusercustomerdto,
){
         return this.customerService.createusercustomer(id,dto)
    }
   @Post(':customerid/assign-employee/:employeeid')
   async assignemployee(
    @Param('customerid',ParseIntPipe) customerid:number,
    @Param('employeeid',ParseIntPipe) employeeid:number,
    @Body() body:{ note:string }
   ){
    const note = body?.note || '- - - -'
    return this.customerService.assignemployeetocustomer(customerid,employeeid,note)
   }
   @Get(':customerid/employee')
   async getemployee(@Param('customerid',ParseIntPipe) customerid:number) {
    return this.customerService.getemployeeofcustomer(customerid)
   }
   @Post(':customerid/assign-user/:userid')
   async assignusertocustomer(
    @Param('customerid',ParseIntPipe) customerid:number,
    @Param('userid',ParseIntPipe) userid:number,
   ) {
    return this.customerService.assignusertocustomer(customerid,userid);
   }
   @Get()
    getcustomers(@Paginate() query:PaginateQuery) {
        return this.customerService.getpaginatedcustomer(query)
    }
   @Get('srini')
    getcustomerss(@Paginate() query:PaginateQuery) {
        return this.customerService.getpaginatedcustomer(query)
    }
    
   
            
    }
 


