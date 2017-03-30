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

const withGraphql = post(
	'/graphql',
	compose(
		bodyParser(),
		apolloUploadKoa({
			uploadDir: config.path.uploads,
		}),
		graphqlKoa(async (ctx) => {
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
					currentUser,
					userRepository,
					postRepository,
				},
				formatError,
			};
		}),
	),
);

const withGraphiql = get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

const withJwt = koaJwt({
	secret: publicKey,
	passthrough: true, // we can secure resolver later by decorator
});

export default compose(withJwt, withGraphql, withGraphiql);
