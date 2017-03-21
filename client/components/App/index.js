import React, { Component, PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

import PostsPage from '../../pages/Posts';
import LoginPage from '../../pages/Login';

import NavBar from '../NavBar';

import './style.css';

export default function App() {
	return (
		<Layout styleName="app">
			<NavBar/>
			<Content>
				<Switch>
					<Route path="/login" component={LoginPage}/>
					<Route path="/register" component={LoginPage}/>
					<Route path="/" component={PostsPage}/>
				</Switch>
			</Content>
		</Layout>
	);
}
