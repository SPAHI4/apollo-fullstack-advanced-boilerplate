import { User } from '../../database/entity';
import { authenticatedOnly } from '../helpers/access';
import { NotFoundError, ForbiddenError } from '../helpers/errors';
import createJwt from '../../utils/createJwt';

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
			const { password, username, email, firstName, lastName } = user;

			if (await userRepository.findOne({ email })) {
				throw new Error('Email exists');
			}
			if (await userRepository.findOne({ username })) {
				throw new Error('Username exists');
			}
			const newUser = new User();
			newUser.username = username; // TODO: remove this
			newUser.email = email;
			newUser.firstName = firstName;
			newUser.lastName = lastName;

			await newUser.setPassword(password);
			await userRepository.persist(newUser);
			const token = await createJwt({ id: newUser.id });
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

			const token = await createJwt({ id: user.id });
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
