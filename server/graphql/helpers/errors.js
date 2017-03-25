import { createError } from 'apollo-errors';

export const UnauthorizedError = createError('UnauthorizedError', {
	statusCode: 401, // https://github.com/thebigredgeek/apollo-errors/issues/5
	message: 'User unauthorized',
});

export const ForbiddenError = createError('ForbiddenError', {
	statusCode: 403,
	message: 'Forbidden',
});

export const NotFoundError = createError('NotFoundError', {
	statusCode: 404,
	message: 'Not found',
});
