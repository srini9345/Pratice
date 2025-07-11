import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { EmployeeModule } from './employee/employee.module';
import { employee } from './employee/employee.entity';
import { CustomerModule } from './customer/customer.module';
import { customer } from './customer/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'Srini@2002',
      database:'ksas',
      entities:[User,employee,customer],
      synchronize:true
    }),
    UsersModule,
    EmployeeModule,
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
