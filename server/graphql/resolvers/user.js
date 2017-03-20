import jwt from 'jsonwebtoken';
import fs from 'fs';
import appRoot from 'app-root-path';

import { User } from '../../database/entity';
import { authenticatedOnly } from '../helpers/access';
import { NotFoundError, ForbiddenError } from '../helpers/errors';
const cert = fs.readFileSync(appRoot.resolve('cert/jwt.rsa'));

async function createToken(user) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			user,
			cert,
			{
				expiresIn: '10d',
			},
			(err, token) => {
				if (err) {
					reject(err);
				} else {
					resolve(token);
				}
			},
		);
	});
}

export default {
	Query: {
		currentUser(root, {}, { currentUser }) {
			return currentUser;
		},
		users(root, { limit, offset }, { userRepository }) {
			console.log('users query');
			return userRepository.find();
		},
	},
	Mutation: {
		async createUser(root, { user }, { userRepository }) {
			const { password, username, email } = user;
			const newUser = userRepository.create(user);

			if (await userRepository.findOne({ email })) {
				throw new Error('Email exists');
			}
			if (await userRepository.findOne({ username })) {
				throw new Error('Username exists');
			}
			await newUser.setPassword(password);
			await userRepository.persist(newUser);
			const token = await createToken({ id: newUser.id });
			return {
				token,
				currentUser: newUser,
			};
		},
		async getToken(root, { username, email, password }, { userRepository }) {
			const condition = username ? { username } : { email };
			const user = await userRepository.findOne(condition);
			if (!user) {
				throw new Error('User not found');
			}
			if (!await user.isPasswordValid(password)) {
				throw new Error('Incorrect password');
			}

			const token = await createToken({ id: user.id });
			return {
				currentUser: user,
				token,
			};
		},
		@authenticatedOnly
		async updateUser(root, { id, user }, { userRepository, currentUser }) {
			if (currentUser.id !== id) {
				throw new ForbiddenError();
			}
			if (user.avatar) {
				user.avatar = user.avatar.path;
			}
			user = await userRepository.preload({
				id,
				...user,
			});
			return userRepository.persist(user);
		},
	},
	Subscription: {},
};
