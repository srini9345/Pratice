import { employee } from "src/employee/employee.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { customer } from "src/customer/customer.entity";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToOne(() => employee, (employee) => employee.user)
    employee: employee;

    @OneToOne(() => customer, (customer) => customer.user)
    customer: customer;

   
}
  

