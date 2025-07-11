import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { employee } from 'src/employee/employee.entity';
import { customer } from 'src/customer/customer.entity';
@Module({
    imports:[TypeOrmModule.forFeature([User,employee,customer])],
    controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
