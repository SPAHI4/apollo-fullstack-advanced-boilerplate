import { graphql } from 'react-apollo';

import CURRENT_USER_QUERY from '../graphql/currentUser.query.gql';

export default graphql(CURRENT_USER_QUERY, { name: 'currentUser' });
