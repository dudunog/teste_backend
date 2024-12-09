import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { TaskEntity } from "../../../task/external/entities/task-entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("list")
export class ListEntity implements ListModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ default: "" })
  slug: string;

  @Column({ default: "" })
  emoji: string;

  @OneToMany(() => TaskEntity, (entity) => entity.list)
  tasks: TaskEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
