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
import { User, Post } from '../database/entity';
import compose from '../utils/composeMiddleware';

const publicKey = fs.readFileSync(appRoot.resolve('cert/jwt.pub'));

const graphql = post(
	'/graphql',
	compose(
		bodyParser(),
		apolloUploadKoa({
			uploadDir: config.path.uploads,
		}),
		graphqlKoa(async(ctx) => {
			const connection = await getConnection();
			const userRepository = connection.getRepository(User);
			const postRepository = connection.getRepository(Post);
			let currentUser = null;

			if (ctx.state.user && ctx.state.user.id) {
				currentUser = await userRepository.findOneById(ctx.state.user.id);
			}

			return {
				schema,
				context: {
					connection,
					currentUser,
					userRepository,
					postRepository,
				},
				formatError,
			};
		}),
	),
);

const graphiql = get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

export default compose(koaJwt({ secret: publicKey, passthrough: true }), graphql, graphiql);
