import React, { PropTypes } from 'react';

import './style.css';

const Avatar = ({ url, size }) => (
	<div styleName='avatar' style={{ height: size, width: size }}>
		<img src={url} alt='' />
	</div>
);

Avatar.propTypes = {
	url: PropTypes.string.isRequired,
	size: PropTypes.number,
};

Avatar.defaultProps = {
	size: 64,
};

export default Avatar;
