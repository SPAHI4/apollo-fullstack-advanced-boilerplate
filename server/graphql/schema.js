import {
	makeExecutableSchema,
	addErrorLoggingToSchema
} from 'graphql-tools';
import { PubSub } from 'graphql-subscriptions';
import {
	GraphQLDate,
	GraphQLDateTime,
} from 'graphql-iso-date';
import { merge } from 'lodash';

// import schema from './schema.graphqls';
const rootSchema = require('fs').readFileSync(__dirname + '/schema.graphqls').toString();
import log from '../../tools/log';
import { postResolvers, userResolvers } from './resolvers';
import { pubsub } from './subscriptions';

const rootResolvers = {
	Query: { },
	Mutation: { },
	Subscription: { },
	Date: GraphQLDate,
	DateTime: GraphQLDateTime,
};


const schema = [rootSchema];
const resolvers = merge(rootResolvers, userResolvers, postResolvers);

const executableSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers,
});

addErrorLoggingToSchema(executableSchema, {
	log: e => console.error(e)
});

export default executableSchema;
