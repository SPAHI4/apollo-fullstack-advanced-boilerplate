import { apolloUploadKoa } from 'apollo-upload-server';
import { graphiqlKoa, graphqlKoa } from 'graphql-server-koa';
import { formatError } from 'apollo-errors';
import koaJwt from 'koa-jwt';

import { router } from '../app';
import config from '../../config';
import schema from '../graphql/schema';
import getConnection from '../database/connection';
import { User } from '../database/entity';

const graphql = router.post(
	'/graphql',
	apolloUploadKoa({
		uploadDir: config.path.uploads
	}),
	async (ctx) => {
		const connection = await getConnection();

		return graphqlKoa({
			schema,
			context: {
				connection,
				currentUser: ctx.state.user,
				userRepository: connection.getRepository(User),
			},
			formatError,
		});
	},
);
const graphiql = router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

export default [koaJwt, graphql, graphiql];
