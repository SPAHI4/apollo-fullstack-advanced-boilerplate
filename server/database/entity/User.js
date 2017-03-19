import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	Index,
	ManyToMany,
	JoinTable
} from 'typeorm';
import bcrypt from 'bcrypt';

import { Post } from './Post';

@Entity()
export class User {
	@PrimaryGeneratedColumn('int')
	id;

	@Index()
	@Column('string', { unique: true })
	email;

	@Index()
	@Column('string', { unique: true })
	username;

	@CreateDateColumn()
	createdAt;

	@Column('string')
	hash;

	@Column('string', { nullable: true })
	firstName;

	@Column('string', { nullable: true })
	lastName;

	@OneToMany(type => Post, post => post.author)
	posts;

	async setPassword(password) {
		// TODO: refresh jwt
		const hash = await bcrypt.hash(password);
		this.hash = hash;
	}

	async isValidPassword(password) {
		return bcrypt.compare(password, this.hash);
	}

}
