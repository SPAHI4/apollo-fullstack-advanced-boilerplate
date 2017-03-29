import {
	makeExecutableSchema,
	addErrorLoggingToSchema,
	addCatchUndefinedToSchema,
} from 'graphql-tools';
import { PubSub } from 'graphql-subscriptions';
import minilog from 'minilog';
import {
	GraphQLDate,
	GraphQLDateTime,
} from 'graphql-iso-date';
import { merge } from 'lodash';

import rootSchema from './schema.graphqls';
// const rootSchema = require('fs').readFileSync(__dirname + '/schema.graphqls').toString();

import { postResolvers, userResolvers } from './resolvers';
import { pubsub } from './subscriptions';

const rootResolvers = {
	Query: {},
	Mutation: {},
	Subscription: {},
	Date: GraphQLDate,
	DateTime: GraphQLDateTime,
};


const schema = [rootSchema];
const resolvers = merge(rootResolvers, userResolvers, postResolvers);

const executableSchema = makeExecutableSchema({
	typeDefs: schema, // TODO: divide schemas like resolvers
	resolvers,
});

addErrorLoggingToSchema(executableSchema, {
	log: (...args) => console.log(args),
});

addCatchUndefinedToSchema(executableSchema);

export default executableSchema;
