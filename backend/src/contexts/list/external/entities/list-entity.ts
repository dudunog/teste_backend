import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { TaskEntity } from "@contexts/task/external/entities/task-entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("list")
export class ListEntity implements ListModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => TaskEntity)
  @JoinTable()
  tasks: TaskEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
