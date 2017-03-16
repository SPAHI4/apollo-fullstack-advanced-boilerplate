import { apolloUploadKoa } from 'apollo-upload-server';
import { graphiqlKoa, graphqlKoa } from 'graphql-server-koa';
import { formatError } from 'apollo-errors';
import { post, get } from 'koa-route';
import koaJwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';
import fs from 'fs';
import appRoot from 'app-root-path';

import config from '../../config';
import schema from '../graphql/schema';
import getConnection from '../database/connection';
import { User } from '../database/entity';
import compose from '../utils/composeMiddleware';

const publicKey = fs.readFileSync(appRoot.resolve('cert/jwt.pub'));

const graphql = post(
	'/graphql',
	compose(
		bodyParser({ enableTypes: ['json'] }),
		apolloUploadKoa({
			uploadDir: config.path.uploads,
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
	),
);
const graphiql = get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

export default compose(koaJwt({ secret: publicKey, passthrough: true }), graphql, graphiql);
