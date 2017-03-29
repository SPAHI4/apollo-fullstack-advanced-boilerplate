import React, { PropTypes, Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';

import { withCurrentUser, currentUserPropType } from '../../helpers/withCurrentUser';

@withCurrentUser
class NavBar extends Component {

	static propTypes = {
		currentUser: currentUserPropType,
	}

	render() {
		const { currentUser } = this.props.currentUser;

		return (
			<Layout.Header>
				<Menu
					selectedKeys={[]}
					mode='horizontal'
				>
					<Menu.Item key='posts'>
						<Link to='/'>
							<Icon type='database' />Posts
						</Link>
					</Menu.Item>
					{
						!currentUser ? (
							<Menu.Item key='login'>
								<Link to='/login'>
									<Icon type='login' />Login
								</Link>
							</Menu.Item>
						) : (
							<Menu.Item key='profile'>
								<Icon type='user' />Edit profile
							</Menu.Item>
						)
					}
				</Menu>
			</Layout.Header>
		);
	}
}

export default NavBar;
