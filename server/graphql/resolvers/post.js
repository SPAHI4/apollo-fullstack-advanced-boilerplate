import { authenticatedOnly } from '../helpers/access';
import { ForbiddenError, NotFoundError } from '../helpers/errors';

export default {
	Query: {
		async posts(root, { take, skip }, { postRepository }) {
			const [nodes, totalCount] = await postRepository.findAndCount();
			return {
				nodes,
				totalCount,
			};
		},
	},
	Mutation: {
		@authenticatedOnly
		createPost(_, { post }, { postRepository }) {
			return postRepository.persist(post);
		},
		@authenticatedOnly
		async updatePost(root, { id, post: postInput }, { postRepository, currentUser }) {
			let post = await postRepository.findOneById(id);
			if (!post) {
				throw new NotFoundError();
			}
			if (post.author.id !== currentUser.id) {
				throw new ForbiddenError();
			}

			post = postRepository.merge(post, postInput);
			return postRepository.persist(post);
		},
	},
	Post: {
		author(post, _, ctx) {
			return {
				id: 123,
				avatar: null,
				username: 'test',
			};
		},
	},
};
