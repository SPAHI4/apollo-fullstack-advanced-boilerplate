// import { routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import * as reducers from './reducers';

export default function configureStore(initialState = {}, client) {
	const store = createStore(
		combineReducers({
			apollo: client.reducer(),
			// routing: routerReducer,
			...reducers,
		}),
		initialState,
		compose(
			applyMiddleware(client.middleware()),
			(typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f,
		),
	);
	return store;
}
