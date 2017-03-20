import { authenticatedOnly } from '../helpers/access';
import { ForbiddenError, NotFoundError } from '../helpers/errors';

export default {
	Query: {
		async posts(root, { filter: { skip, take, fields } }, { postRepository }) {
			const [ posts, count ] = await postRepository.findAll(filter);
		},
	},
	Mutation: {
		@authenticatedOnly
		createPost(root, { post }, { postRepository }) {
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
};
