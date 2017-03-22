import React, { Component, PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

import PostsPage from '../../pages/Posts';
import LoginPage from '../../pages/Login';

import NavBar from '../NavBar';

import './style.css';

const { Content, Footer } = Layout;

export default function App() {
	return (
		<Layout styleName='app'>
			<NavBar />
			<Content styleName='content'>
				<Switch>
					<Route path='/login' component={LoginPage} />
					<Route path='/register' component={LoginPage} />
					<Route path='/' component={PostsPage} />
				</Switch>
			</Content>
			<Footer styleName='footer'>
				2017, Apollo advanced boilerplate
			</Footer>
		</Layout>
	);
}
