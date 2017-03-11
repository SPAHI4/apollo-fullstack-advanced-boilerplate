import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/store';
import apolloClient from './apolloClient';
import AppComponent from './components/App';

const root = document.querySelector('#app');
const store = configureStore({}, apolloClient);

function renderApp(App) {
	render((
		<ApolloProvider store={store} client={apolloClient}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</ApolloProvider>
	), root);
}

renderApp(AppComponent);

if (module.hot) {
	// Accept changes to this file for hot reloading.
	module.hot.accept('./index.js');
	// Any changes to our App will cause a hotload re-render.
	module.hot.accept(
		'./components/App',
		() => renderApp(require('./components/App').default),
	);
}
