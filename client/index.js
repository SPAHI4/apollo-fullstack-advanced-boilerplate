import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/store';
import apolloClient from './apolloClient';
import App from './components/App';

const root = document.querySelector('#app');
const store = configureStore({}, apolloClient);

function renderApp() {
	render((
		<ApolloProvider store={store} client={apolloClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>
	), root);
}

renderApp();

if (module.hot) {
	module.hot.accept('./index.js');
	module.hot.accept(
		'./components/App',
		() => renderApp(),
	);
}
