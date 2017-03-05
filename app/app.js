import React from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router
} from 'react-router-dom';
import { createBatchingNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import configureStore from './redux/store';
import routes from './routes';

const root = document.querySelector('#app');

const App = () => (
	<ApolloProvider>
		<Router
			history={history}
			routes={routes}
		/>
	</ApolloProvider>
);

render(<App/>, root);
