import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Spin, Button } from 'antd';

import './style.css';
import { PostsList } from '../../components/PostsList';
import POSTS_QUERY from '../../graphql/post/posts.query.gql';

const PER_PAGE = 10;

@graphql(POSTS_QUERY, {
	options: {
		variables: {
			skip: 0,
			take: PER_PAGE,
		},
	},
	props: ({ data: { loading, error, posts = {}, fetchMore }, ownProps }) => ({
		loading,
		error,
		posts,
		loadMorePosts: () => fetchMore({
			variables: { skip: posts.nodes.length },
			updateQuery: (previousResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return previousResult;
				}
				return {
					...previousResult,
					posts: {
						node: [...previousResult.posts.nodes, fetchMoreResult.posts.nodes],
						totalCount: fetchMoreResult.totalCount,
					},
				};
			},
		}),
	}),
})
class PostsPage extends Component {

	static propTypes = {
		loading: PropTypes.bool.isRequired,
		error: PropTypes.object,
		posts: PropTypes.shape({
			totalCount: PropTypes.number,
			nodes: PropTypes.arrayOf(PropTypes.object),
		}).isRequired,
		loadMorePosts: PropTypes.func.isRequired,
	}

	render() {
		const { posts, loading, error, loadMorePosts } = this.props;

		if (error) {
			return (
				<div>
					Error while loading posts occurred:
					<pre>{error.message}</pre>
				</div>
			);
		}

		const { nodes = [], totalCount = 0 } = posts;

		return (
			<div>
				Posts
				<PostsList posts={nodes} />
				<div styleName='load-more'>
					{ totalCount > nodes.length && (
						<Button loading={loading} onClick={loadMorePosts}>Load more</Button>
					) }
				</div>
			</div>
		);
	}
}

export default PostsPage;
