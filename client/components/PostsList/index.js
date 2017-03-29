import React, { PropTypes } from 'react';

import './style.css';

export const PostItem = ({ post }) => (
	<div>
		{post.title}
	</div>
);

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
};

export const PostsList = ({ posts }) => (
	<div styleName='list'>
		{posts.map(post => <PostItem key={post.id} post={post} />)}
	</div>
);

PostsList.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object),
};
