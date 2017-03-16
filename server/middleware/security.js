import helmet from 'koa-helmet';
import rateLimit from 'koa-ratelimit';

import config from '../../config';
import compose from '../utils/composeMiddleware';

// TODO: ratelimit

export default compose(helmet());
