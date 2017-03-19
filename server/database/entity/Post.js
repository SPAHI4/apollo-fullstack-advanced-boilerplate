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
	id;

	@CreateDateColumn()
	createdAt;

	@UpdateDateColumn()
	updatedAt;

	@Column('text')
	content;

	@Column('string')
	title;

	@ManyToOne(type => User, user => user.posts)
	author;

}
