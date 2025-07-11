import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "employee" })
export class employee {
  @Column()
  employee_id:number;  
  @Column()
  customer_id:number;
  @Column()
  notes:string;
  



  
  }