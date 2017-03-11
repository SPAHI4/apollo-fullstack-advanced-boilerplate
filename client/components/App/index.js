import React, { Component, PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '../../pages/Main';

export default function App() {
	return (
		<div className="my-app">
			TEST APP!
			<Switch>
				<Route path="/" component={MainPage}/>
			</Switch>
		</div>
	);
}
