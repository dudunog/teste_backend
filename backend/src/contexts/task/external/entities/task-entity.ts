import { ListEntity } from "../../../list/external/entities/list-entity";
import { TaskModel } from "../../domain/models/task-model.struct";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("task")
export class TaskEntity implements TaskModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  listId: string;

  @ManyToOne(() => ListEntity, (list) => list.id)
  @JoinColumn({ name: "listId" })
  list: ListEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
