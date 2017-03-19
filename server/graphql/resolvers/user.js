import { User } from '../../database/entity';

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
		createUser(root, { user }, { userRepository }) {
			return userRepository.persist(user);
		},
	},
	Subscription: {

	},
};
