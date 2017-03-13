import React, { Component, PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

import MainPage from '../../pages/Main';

import NavBar from '../NavBar';

import './style.css';

export default function App() {
	return (
		<Layout styleName="app">
			<NavBar/>
			<Content>
				<Switch>
					<Route path="/" component={MainPage}/>
				</Switch>
			</Content>
		</Layout>
	);
}
