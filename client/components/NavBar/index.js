import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';

const NavBar = () => {
	return (
		<nav>
			<Menu
				selectedKeys={[]}
				mode="horizontal"
			>
				<Menu.Item key="mail">
					<Icon type="mail" />Navigation 123
				</Menu.Item>
				<Menu.Item key="app" disabled>
					<Icon type="appstore" />Navigation Two
				</Menu.Item>
			</Menu>
		</nav>
	);
};

NavBar.propTypes = {};

export default NavBar;
