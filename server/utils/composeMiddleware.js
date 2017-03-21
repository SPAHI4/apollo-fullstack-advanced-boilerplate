import compose from 'koa-compose';

export default (...middlewares) => compose(middlewares);
