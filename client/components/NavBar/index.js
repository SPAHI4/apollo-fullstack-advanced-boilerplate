import React, { PropTypes, Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';

import withUser from '../../helpers/withUser';

@withUser
class NavBar extends Component {

	static propTypes = {
		currentUser: PropTypes.shape({
			loading: PropTypes.bool.isRequired,
			error: PropTypes.string,
			currentUser: PropTypes.object,
		}).isRequired,
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
