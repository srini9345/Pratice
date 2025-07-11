import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { customer } from './customer.entity';
import { employee } from 'src/employee/employee.entity';

@Module({

  imports:[TypeOrmModule.forFeature([User,customer,employee])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
