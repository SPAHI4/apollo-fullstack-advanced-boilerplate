import { get, post } from 'koa-route';
import { apolloUploadKoa } from 'apollo-upload-server';
import { graphiqlKoa, graphqlKoa } from 'graphql-server-koa';
import { formatError } from 'apollo-errors';

import config from '../../config';
import { schema } from '../graphql/schema';

const graphql = post(
	'/graphql',
	apolloUploadKoa({
		uploadDir: config.path.uploads
	}),
	(ctx) => graphqlKoa({
		schema,
		context: {},
		formatError,
	}),
);
const graphiql = get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

export default [graphql, graphiql];
