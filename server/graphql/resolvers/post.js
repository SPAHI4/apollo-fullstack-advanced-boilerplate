import { authenticatedOnly } from '../helpers/access';

export default {
	Query: {
		posts(root, {}, { postRepository }) {
			return postRepository.find();
		},
	},
	Mutation: {
		@authenticatedOnly
		createPost(root, { post }, { postRepository }) {
			return postRepository.persist(post);
		},
	},
};
