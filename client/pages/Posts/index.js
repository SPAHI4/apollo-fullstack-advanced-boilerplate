import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Spin } from 'antd';

import './style.css';
import PostsList from '../../components/PostsList';
import POSTS_QUERY from '../../graphql/posts.query.gql';

@graphql(POSTS_QUERY, {
	name: 'posts',
})
class PostsPage extends Component {

	static propTypes = {
		posts: PropTypes.shape({
			loading: PropTypes.bool.isRequired,
			posts: PropTypes.array,
		}).isRequired,
	}

	render() {
		const { posts = [], loading, error } = this.props.posts;

		return (
			<div>
				Posts
				<Spin spinning={loading}>
					<PostsList posts={posts}/>
				</Spin>
			</div>
		);
	}
}

export default PostsPage;
