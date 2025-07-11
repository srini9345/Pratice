import { IsEmpty, isEmpty } from 'class-validator';
import { employee } from 'src/employee/employee.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer' })
export class customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneno: number;
  
  @Column()
  @IsEmpty()
  note:string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => employee, (employee) => employee.customers)
  employee: employee;
}
