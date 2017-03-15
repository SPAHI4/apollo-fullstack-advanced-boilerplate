import { User } from '../../database/entity';

export default {
	Query: {
		currentUser(root, {}, { currentUser }) {
			return currentUser;
		},
		users(root, { limit, offset }, { userRepository }) {
			return userRepository.find();
		},
	},
	Mutation: {
		createUser(root, { user }, { userRepository }) {

		}
	},
	Subscription: {

	},
};
