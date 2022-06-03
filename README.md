# nodejs-package-practice
## - Koa -
[官網連結](https://koajs.com/)

相對於express較為輕量，所以有些功能需要透過Middleware處理，支援async。

以小而美為依歸。koa之於express，就像python世界中的flask之於Django。

### 安裝
- 安裝koa
```bash
npm i koa --save
```
- 安裝koa router：為了設定路由
```bash
npm install --save koa-router
```

- 安裝koa body：這是middleware，為了讀取送進來的表單資料
```bash
npm install --save koa-body
```


### 檔案說明
- `server.js` 基本koa server
- `serverWithRouter.js` 加上路由的koa server
- `api.js` 使用koa寫的rest api，包含CRUD。