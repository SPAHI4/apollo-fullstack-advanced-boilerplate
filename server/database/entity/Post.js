import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
	ManyToMany,
	JoinTable
} from "typeorm";

import { User } from './User';

@Entity()
export class Post {
	@PrimaryGeneratedColumn('int')
	id = undefined;

	@CreateDateColumn()
	createdAt = undefined;

	@UpdateDateColumn()
	updatedAt = undefined;

	@Column('text')
	content = undefined;

	@Column('string')
	title = undefined;

	@ManyToOne(type => User, user => user.posts)
	author = undefined;

}
