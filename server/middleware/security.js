import helmet from 'koa-helmet';
import rateLimit from 'koa-ratelimit';

import config from '../../config';

// TODO: ratelimit

export default [ helmet() ];
