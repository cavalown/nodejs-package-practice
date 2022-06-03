/**
 * 用koa 做一個rest api - CRUD
 * 用部落格為目標範例。
 * 這裡的id用uuid version 4
 * 測試的api在postma/
 */

const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');
const { v4: uuidv4 } = require('uuid'); // import { v4 as uuidv4 } from 'uuid';
const app = new Koa();
const router = new Router({ prefix: "/api" });
app.use(KoaBody());


let articles = [
  {
    id: 'c1766d89-b283-4fe6-911b-3996e05f2165',
    title: '文章1',
    createTime: '2021-03-16T13:48:02.797Z',
    content: '這是我的第一篇文章唷！'
  }
]

router
  // 通常會寫一個判斷服務是否有啟動的api
  .get('/', ctx => {
    ctx.body = 'Service On'
  })
  // 新增文章(C)
  .post('/articles', ctx => {
    // 接到的資訊
    const { title, content } = ctx.request.body;
    if (title && content) {
      const id = uuidv4();
      const createTime = new Date().toISOString()
      articles.push({
        id: id,
        title: title,
        createTime: createTime,
        content: content
      })
      // 回傳的資訊
      ctx.status = 201;
      ctx.body = { id: id };
    } else {
      ctx.status = 400;
    }
  })
  // 讀取文章(R)
  .get('/article/:id', ctx => {
    const article = articles.find(item => item.id === ctx.params.id);
    if (article) {
      ctx.body = article;
    } else {
      ctx.status = 404;
    }
  })
  // 取得所有文章標題(R)
  .get('/articles', ctx => {
    ctx.body = articles.map(item => item.title);
  })
  // 修改(更新)文章(U)
  .put('/article/:id', ctx => {
    const { title, content } = ctx.request.body;
    let articleUpdate = articles.find(item => item.id === ctx.params.id);
    if (title) articleUpdate.title = title;
    if (content) articleUpdate.content = content;
    ctx.body = {
      title: articleUpdate.title,
      message: '已經更新。'
    }
  })
  // 刪除文章(D)
  .delete('/article/:id', ctx => {
    const article = articles.find(item => item.id === ctx.params.id);
    if(article) {
      articles = articles.filter(item=>item.id!==ctx.params.id);
      ctx.status = 204;
    }else {
      ctx.status = 404;
    };
  });


app.use(router.routes());
app.listen(3000);
