import { customer } from 'src/customer/customer.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employee' })
export class employee {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => customer, (customer) => customer.employee)
  customers: customer[];

  @Column({ nullable: true })
  note: string;
   
}
