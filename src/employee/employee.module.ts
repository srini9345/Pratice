import { Module } from '@nestjs/common';
import { employee } from './employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { customer } from 'src/customer/customer.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,employee,customer]),UsersModule],
  controllers: [EmployeeController],
  providers: [EmployeeService]})
export class EmployeeModule {}
