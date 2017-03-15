import {
	makeExecutableSchema,
	addErrorLoggingToSchema
} from 'graphql-tools';
import { PubSub } from 'graphql-subscriptions';
import {
	GraphQLDate,
	GraphQLDateTime
} from 'graphql-iso-date'

// import schema from './schema.graphqls';
const schema = require('fs').readFileSync(__dirname + '/schema.graphqls').toString();
import log from '../../tools/log';

const resolvers = {
	Query: {
		currentUser(root, {}, { currentUser }) {
			return currentUser;
		},
		users() {

		},
		posts() {

		}
	},
	Mutation: {
		createPost() {

		}
	},
	Subscription: {
		postCreated() {

		}
	},
	User: {
		posts() {

		}
	},
	Post: {
		author() {

		}
	},
	Date: GraphQLDate,
	DateTime: GraphQLDateTime,
};

const executableSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers,
});

addErrorLoggingToSchema(executableSchema, {
	log(e) {
		log.error(e);
	}
});


export const pubsub = new PubSub();
export default executableSchema;
