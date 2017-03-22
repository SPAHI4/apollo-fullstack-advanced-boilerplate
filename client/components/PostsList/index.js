import React, { Component, PropTypes } from 'react';

import './style.css';

const PostItem = post => (
	<div>
		{post.title}
	</div>
);

export default class PostsList extends Component {

	static propTypes = {
		posts: PropTypes.array,
	}

	render() {
		const { posts } = this.props;

		return (
			<div styleName='list'>
				{posts.map(post => <PostItem post={post} />)}
			</div>
		);
	}

}
