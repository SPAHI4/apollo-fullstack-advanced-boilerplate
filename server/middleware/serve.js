import serve from 'koa-static';
import appRoot from 'app-root-path';
import mount from 'koa-mount';
import { get } from 'koa-route';
import send from 'koa-send';

import config from '../../config';
import compose from '../utils/composeMiddleware';

const assets = serve(config.path.frontend);

const uploads = mount('/uploads', (ctx) => { ctx.set('Content-Disposition', 'attachment'); }, serve(config.path.uploads));

const anyPath = async (ctx, next) => {
	await next();
	if (ctx.method === 'GET') {
		await send(ctx, 'index.html', { root: config.path.frontend });
	}
};

export default compose(assets, uploads, anyPath);
