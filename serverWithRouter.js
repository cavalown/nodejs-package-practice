/**
 * 啟動一個有設定路由的koa server
 */

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


router
.get('/', ctx=>{
    ctx.body = 'server on';
})
.get('/home', ctx=>{
    ctx.body = 'Hello Koa'
})

app.use(router.routes());

app.listen(3000);