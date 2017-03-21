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
	id = undefined; // TODO: remove undefined declaration

	@Index()
	@Column('string', { unique: true })
	email = undefined;

	@Index()
	@Column('string', { unique: true })
	username = undefined;

	@CreateDateColumn()
	createdAt = undefined;

	@Column('string')
	hash = undefined;

	@Column('string', { nullable: true })
	firstName = undefined;

	@Column('string', { nullable: true })
	lastName = undefined;

	@OneToMany(type => Post, post => post.author)
	posts = undefined;

	async setPassword(password) {
		// TODO: refresh jwt
		const hash = await bcrypt.hash(password, 10);
		this.hash = hash;
	}

	async isPasswordValid(password) {
		return bcrypt.compare(password, this.hash);
	}

}
