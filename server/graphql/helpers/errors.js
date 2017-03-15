import { createError } from 'apollo-errors';

export const UnauthorizedError = createError('UnauthorizedError', {
	code: 401,
	message: 'User unauthorized',
});

export const ForbiddenError = createError('ForbiddenError', {
	code: 403,
	message: 'Forbidden',
});

export const NotFoundError = createError('NotFoundError', {
	code: 404,
	message: 'Not found',
});
