import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { PropTypes } from 'react';

import CURRENT_USER_QUERY from '../graphql/user/currentUser.query.gql';

export const withCurrentUser = graphql(
	CURRENT_USER_QUERY,
	{
		name: 'currentUser',
		alias: 'withCurrentUser',
	},
);

export const currentUserPropType = PropTypes.shape({
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	currentUser: propType(CURRENT_USER_QUERY),
});
