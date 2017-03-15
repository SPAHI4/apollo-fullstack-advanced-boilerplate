import serve from 'koa-static';
import appRoot from 'app-root-path';
import mount from 'koa-mount';
import send from 'koa-send';

import config from '../../config';

const assets = serve(config.path.frontend);

const uploads = mount('/uploads', ctx => { ctx.set('Content-Disposition', 'attachment'); }, serve(config.path.uploads));

export default [ assets, uploads ];
