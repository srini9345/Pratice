import { Body, Controller, ParseIntPipe, Post ,Get,Param, Query} from '@nestjs/common';
import { createemployeedto } from './employeedto';
import { EmployeeService } from './employee.service';
import { createuseremployeedto } from 'src/createuseremployee.dto';
import { Paginate, paginate, PaginateQuery } from 'nestjs-paginate';



@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
    @Post()
    create(@Body() dto:createemployeedto) {
        return this.employeeService.create(dto);
    }
    
    @Post(':id/employee')
         createuseremployee(
            @Param('id',ParseIntPipe) id: number,
            @Body() dto:createuseremployeedto,
    
         ){
            return this.employeeService.createuseremployee(id,dto);
         }
    @Post(':employeeid/assign-customer/:customerid')
    async assigncustomer(
      @Param('employeeid',ParseIntPipe) employeeid:number,
      @Param('customerid',ParseIntPipe) customerid:number,
    )  {
      return this.employeeService.assigncustomertoemployee(employeeid,customerid)
    }
    @Get(':employeeid/customer')
    async getcustomers(@Param('employeeid',ParseIntPipe) employeeid:number) {
      return this.employeeService.getcustomersforemployee(employeeid);
    }
    @Post(':employeeid/assign-user/:userid')
    async assignusertoemployee(
      @Param('employeeid',ParseIntPipe) employeeid:number,
      @Param('userid',ParseIntPipe) userid:number,
    ) {
      return this.employeeService.assignusertoemployee(employeeid,userid);
    }
    @Get(':employeeid/p/customers')
    async getcustomer(
      @Param('employeeid',ParseIntPipe) employeeId:number,
      @Paginate() Query:PaginateQuery,

    ) {
      return this.employeeService.getcustomerofemployee(employeeId,Query)
    }

  
        
      }
    
    



