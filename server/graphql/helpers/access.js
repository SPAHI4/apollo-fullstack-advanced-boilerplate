import { UnauthorizedError, ForbiddenError, NotFoundError } from './errors';

export function authenticatedOnly(target, name, descriptor) {
	const method = descriptor.value;

	descriptor.value = function (root, params, ctx) {
		if (!ctx.currentUser) {
			throw new UnauthorizedError();
		}
		method.call(this, root, params, ctx);
		return this;
	};
}
