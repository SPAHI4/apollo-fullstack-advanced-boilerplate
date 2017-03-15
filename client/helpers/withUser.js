import { graphql } from 'react-apollo';

export const authenticatedOnly = (target) => {
	return async(root, params, ctx) => {
		if (!ctx.currentUser) {
			throw new UnauthorizedError();
		}
		return target(root, params, ctx);
	}
};
