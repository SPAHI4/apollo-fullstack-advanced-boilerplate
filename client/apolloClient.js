import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';
import { createBatchNetworkInterface } from 'apollo-upload-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const getAuthToken = () => localStorage.getItem('auth-token');

const networkInterface = createBatchNetworkInterface({
	uri: '/graphql',
	batchInterval: 10,
	opts: {
		credentials: 'same-origin',
	},
});

const wsClient = new SubscriptionClient(window.location.origin.replace('https:', 'wss:'), {
	reconnect: true,
	connectionParams: {
		authToken: getAuthToken(),
	},
});

const authMiddleware = {
	applyBatchMiddleware(req, next) {
		if (!req.options.headers) {
			req.options.headers = {};
		}
		// get the authentication token from local storage if it exists
		const token = getAuthToken();
		req.options.headers.authorization = token ? `Bearer ${token}` : null;
		next();
	},
};

const authErrorAfterware = {
	applyBatchAfterware({ responses }, next) {
		responses.forEach((response) => {
			if (response.status === 500) {
				// TODO: show error message
				console.error('Server returned an error');
			}
		});
		next();
	},
};

const serverErrorAfterware = {
	applyBatchAfterware({ responses }, next) {
		responses.forEach((response) => {
			if (response.status === 500) {
				// TODO: show error message
				console.error('Server returned an error');
			}
		});
		next();
	},
};

networkInterface
	.use([authMiddleware])
	.useAfter([authErrorAfterware, serverErrorAfterware]);

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
	networkInterface,
	wsClient,
);

const apolloClient = new ApolloClient({
	networkInterface: networkInterfaceWithSubscriptions,
	queryDeduplication: true,
});


export default apolloClient;
