// import { routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import reducers from './reducers';

export default function configureStore(initialState = {}, apolloClient) {
	const store = createStore(
		combineReducers({
			apollo: apolloClient.reducer(),
			// routing: routerReducer,
			...reducers,
		}),
		initialState,
		compose(
			applyMiddleware(apolloClient.middleware()),
			(typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f,
		),
	);

	if (process.env.NODE_ENV === 'development' && module.hot) {
		module.hot.accept('./reducers', () => {
			// eslint-disable-next-line global-require
			const nextRootReducer = require('./reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
